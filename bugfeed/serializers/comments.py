from rest_framework import serializers
from bugfeed.models.comments import Comments


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
        read_only_fields = ['comment_by', 'comment_text', 'comment_time']



