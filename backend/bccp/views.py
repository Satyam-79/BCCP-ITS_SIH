from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import ProductSerializer
from .models import ProductModel


class ProductView(APIView):
    def get(self, request):
        products = ProductModel.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductDetailView(APIView):
    def get(self, request, pk):
        product = ProductModel.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProductCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        user = str(request.user)
        tags = request.data["tags"]
        context = {"user": user, "tags": tags}
        product = {
            "name": data["name"],
            "description": data["description"],
            "tags": data["tags"],
        }

        serializer = ProductSerializer(data=product, many=False)
        if serializer.is_valid():
            serializer.save(context=context)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )


# class AuthorViewSet(viewsets.ModelViewSet):
#     """
#     List all workers, or create a new worker.
#     """
#     queryset = Author.objects.all()
#     serializer_class = AuthorSerializer
