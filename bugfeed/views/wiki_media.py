from shutil import copy
from os import makedirs

from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated



class Wiki_Media(APIView):
    permission_classes=[IsAuthenticated]
    dst_sub_directory='extras'
    

    def post(self,request):
        path=request.data.get('path',None)
        if path is None:
            return Response(
                    'Invalid path provided',
                    status=status.HTTP_400_BAD_REQUEST,
            )

    
        
        
        folder_name = '../wiki_media'
        dst_dir = (
            f'{settings.MEDIA_ROOT}/'
            f'{self.dst_sub_directory}/{folder_name}'
        )

        try:
            makedirs(dst_dir)
        except FileExistsError:
            pass

        

        main_file_src=f'{settings.PERSONAL_ROOT}/{path}'
        dst_path = copy(main_file_src,dst_dir)

        response_path= (
                f'{settings.MEDIA_URL}/{self.dst_directory}/'
                f'{path}'
            )

        media_data = {
                'message':f'{path} moved to {dst_path}',
                'path': response_path,
                }

        return Response(media_data, status=status.HTTP_201_CREATED)



