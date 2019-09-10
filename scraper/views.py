from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers import DocumentSerializers
from .models import Document
from .permissions import IsOwnerOrReadOnly
from .soup.image_parser import detect_text_uri
# Create your views here.


class DocumentList(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        documents = Document.objects.all()
        serializer = DocumentSerializers(documents, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['document'] = detect_text_uri(request.data['url'], request.data['reqType])
        serializer = DocumentSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)


class DocumentDetail(APIView):

    permission_classes = (IsOwnerOrReadOnly,)

    def get_movie(self, pk):
        try:
            document = Document.objects.get(pk=pk)
        except Document.DoesNotExist:
            raise Http404

        return document

    def get(self, _request, pk):
        document = self.get_movie(pk)

        serializer = DocumentSerializers(document)
        return Response(serializer.data)

    def put(self, request, pk):
        document = self.get_movie(pk)
        serializer = DocumentSerializers(document, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

    def delete(self, _request, pk):
        document = self.get_movie(pk)
        document.delete()
        return Response(status=204)
