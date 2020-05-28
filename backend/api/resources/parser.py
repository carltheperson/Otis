import re

def parse(source):
    return get_parsed(source)

def get_parsed(part):
    parsed_screen = parse_screen(part)

    for i in range(0, len(parsed_screen["options"])):
        parsed_screen["options"][i]["rest"] = get_parsed(parsed_screen["options"][i]["rest"])

    return(parsed_screen)

def clean(source):
    return re.sub(r"[\t]*", "", source).rstrip().lstrip()

def parse_screen(part):
    text = clean(part.split("* ")[0])
    options = get_options(part)

    return {"text": text, "options": options}

def get_options(part):
    if "*" not in part:
        return []

    options = clean("* "+"* ".join(part.split("* ")[1:])).split("}")

    cleaned_options = []
    for option in options:
        if option != "" and option != "\n":
            option_text = "".join(option.split("{")[0]).split("* ")[1].rstrip()
            rest = option.split(option_text)[1]
            cleaned_options.append({"option_text": option_text, "rest": rest})

    return cleaned_options