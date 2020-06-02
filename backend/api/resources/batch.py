import random

source = ""

def convert(parsed):
    global source
    source = ""

    convert_screen(parsed, "main")

    return "@echo off\n" + source

def convert_screen(screen, id):
    global source

    options = get_options(screen["options"], id)

    source += """
:%s
cls
echo %s
%s
    """ % (id, screen["text"], options["code"])

    for i in range(0, len(screen["options"])):
        convert_screen(screen["options"][i]["rest"], options["option_ids"][i])

def get_options(options, parrent_id):

    if len(options) == 0:
        return {"code": "pause\ngoto main"}

    option_text = ""
    for i in range(0, len(options)):
        option_text += "\necho {}. {}".format(i+1, options[i]["option_text"])
    
    option_ids = []
    option_code = []

    for i in range(0, len(options)):
        option_id = get_id()

        option_code.append("\nif %answer%=={} (\ngoto {}\n)".format(i+1, option_id))
        option_ids.append(option_id)
    
    option_code = "\nset /p answer=\n" + "".join(option_code) + "\ngoto " + parrent_id + "\n"

    return {"code": option_text + option_code, "option_ids": option_ids}

def get_id():
    return "_" + str(random.randrange(100000, 999999)) 