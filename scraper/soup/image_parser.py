import os
from google.cloud.vision import types
from google.cloud import vision
from google.protobuf.json_format import MessageToJson
from enum import Enum


def detect_text_uri(uri, use_case='label'):

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'Project4Image-230af9c5d713.json'
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
        # response = get_document_bounds(
        #     response.textAnnotations, FeatureType.BLOCK)
        return MessageToJson(response)
    elif use_case == 'handwriting':
        response = client.document_text_detection(image=image)
        return MessageToJson(response)
    elif use_case == 'Web':
        response = client.web_detection(image=image)
        return MessageToJson(response)
    else:
        raise EOFError


class FeatureType(Enum):
    PAGE = 1
    BLOCK = 2
    PARA = 3
    WORD = 4
    SYMBOL = 5


def get_document_bounds(document, feature):
    bounds = []
    for i, page in enumerate(document.pages):
        for block in page.blocks:
            if feature == FeatureType.BLOCK:
                bounds.append(block.bounding_box)
            for paragraph in block.paragraphs:
                if feature == FeatureType.PARA:
                    bounds.append(paragraph.bounding_box)
                for word in paragraph.words:
                    for symbol in word.symbols:
                        if (feature == FeatureType.SYMBOL):
                            bounds.append(symbol.bounding_box)
                    if (feature == FeatureType.WORD):
                        bounds.append(word.bounding_box)
        return bounds
