import random

import parser

source = ""

def convert(parsed):
    global source
    source = ""

    convert_screen(parsed, "main")
    source += "\nmain"

    return source

def convert_screen(screen, id):
    global source

    options = get_options(screen["options"], id)

    source += """
%s () {
clear
echo %s
%s
}
    """ % (id, screen["text"], options["code"])

    for i in range(0, len(screen["options"])):
        convert_screen(screen["options"][i]["rest"], options["option_ids"][i])

def get_options(options, parrent_id):
    
    if len(options) == 0:
        return {"code": "read\nmain", "option_ids": []}
    
    option_text = []
    for i in range(0, len(options)):
        option_text.append("\necho {}. {}".format(i+1, options[i]["option_text"]))
    option_text = "".join(option_text)

    option_ids = []
    option_code = []
    for i in range(0, len(options)):
        option_id = get_id()

        if_string = "if"
        if (i > 0):
            if_string = "elif"
        option_code.append("\n{} [ \"$answer\" -eq \"{}\" ]; then\n{}".format(if_string, i+1, option_id))
        option_ids.append(option_id)
    option_code = "\nread answer\n" + "".join(option_code) + "\n fi\n" + parrent_id + "\n"

    return {"code": option_text + option_code, "option_ids": option_ids}


def get_id():
    return "_" + str(random.randrange(100000, 999999))