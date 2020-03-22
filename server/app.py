from flask import  Flask, render_template, url_for, request, redirect, jsonify
import email, imaplib
import re



PORT = 5005 #don't make it 5000 :)
USERNAME = "XXXX@gmail.com" #https://www.google.com/settings/security/lesssecureapps, if you dont do this, google would block log in
PASSWORD = "XXXXXXXX" #Don't leave your password here :)

app = Flask(__name__)

def get_body(msg):
    """
    Get body of email
    Source: https://www.youtube.com/watch?v=e-OZeAHFpkw
    """
    if msg.is_multipart():
        return get_body(msg.get_payload(0))
    else:
        return msg.get_payload(None,True)


def get_emails(result_bytes, con, n=-1):
    """
    Get last n emails from byte array, gets all emails if n is not specified
    Source: https://www.youtube.com/watch?v=e-OZeAHFpkw
    """

    counter = 0
    msgs = []
    for num in result_bytes[0].split()[::-1]:
        typ, data = con.fetch(num, '(RFC822)')
        msgs.append(data)
        counter += 1
        if counter == n: break
    return msgs

def search(key,value,con):
    """
    Search for particular email
    Source: https://www.youtube.com/watch?v=e-OZeAHFpkw
    """
    result, data  = con.search(None,key,'"{}"'.format(value))
    return data


def get_raw(data):
    return email.message_from_bytes(data[0][1])




def get_duo_passcodes(con):

    """
    Gets the most recent duo passcodes
    """

    last_txt_message = get_emails(search("SUBJECT", "New text message from", con), con, 1)[0]
    body = str(get_body(get_raw(last_txt_message)))

    passcodes = re.findall("[0-9][0-9][0-9][0-9][0-9][0-9][0-9]", body)[0:10] 
    passcodes = sorted(passcodes)

    return passcodes


@app.route('/codes')
def getCodes():
    """
    Returns the most recent codes in the format 'code1,code2,...,code10',
    returns 'ERROR' if something goes wrong
    """

    try:
        con = imaplib.IMAP4_SSL("imap.gmail.com")
        con.login(USERNAME, PASSWORD)
        con.select("INBOX")

        passcodes = get_duo_passcodes(con)
        con.logout()
        return ",".join(passcodes)
    
    except Exception as e:
        return "ERROR"
        



if __name__ == "__main__":
    app.run(port=PORT)