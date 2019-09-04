from rest_framework import serializers
from auth.serializers import UserSerializer
from .models import Document


class DocumentSerializers(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Document
        fields = ('id', 'document', 'url', 'created_at',
                  'updated_at', 'user')
