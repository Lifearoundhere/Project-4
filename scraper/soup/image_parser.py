import os
from google.cloud.vision import types
from google.cloud import vision
from google.protobuf.json_format import MessageToJson


def detect_text_uri(uri, use_case='label'):

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = '/Users/p/Downloads/Project4Image-230af9c5d713.json'
    # Instantiates a client
    # Performs label detection on the image file
    client = vision.ImageAnnotatorClient()
    image = vision.types.Image()
    image.source.image_uri = uri
    if use_case == 'label':
        response = client.label_detection(image=image)
        # labels = response.label_annotations
        return MessageToJson(response)
    elif use_case == 'properties':
        response = client.image_properties(image=image)
        return MessageToJson(response)
    elif use_case == 'faces':
        response = client.face_detection(image=image)
        return MessageToJson(response)
    elif use_case == 'text':
        response = client.text_detection(image=image)
        return MessageToJson(response)
    elif use_case == 'handwriting':
        response = client.document_text_detection(image=image)
        return MessageToJson(response)
    elif use_case == 'Web':
        response = client.web_detection(image=image)
        return MessageToJson(response)
    else:
        raise EOFError
