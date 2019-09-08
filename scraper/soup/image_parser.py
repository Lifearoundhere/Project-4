import io
import os
import pprint
from google.cloud.vision import types
from google.cloud import vision
from google.protobuf.json_format import MessageToJson


def detect_text_uri(uri):

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = '/Users/p/Downloads/Project4Image-230af9c5d713.json'
    # Imports the Google Cloud client library

    # Instantiates a client
    client = vision.ImageAnnotatorClient()

    image = vision.types.Image()
    image.source.image_uri = uri

    # Performs label detection on the image file
    response = client.label_detection(image=image)
    labels = response.label_annotations

    return MessageToJson(response)
