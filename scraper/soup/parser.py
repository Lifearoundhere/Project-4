from bs4 import BeautifulSoup
import requests


def html_parser(webpage, lib='lxml'):
    """
    webpage = 'https://pythonprogramming.net/parsememcparseface/' etc
    """
    source = requests.get(webpage).text
    soup = BeautifulSoup(source, lib)
    image = soup.find('img')['src']
    return image
