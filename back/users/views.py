from rest_framework import viewsets, generics, permissions
from .models import User, Patient, Dentist, Appointment, Notes, Invoice
from .serializers import UserSerializer, PatientSerializer, DentistSerializer, AppointmentSerializer, NotesSerializer, InvoiceSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class RegisterPatientView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [permissions.AllowAny]

class RegisterDentistView(generics.CreateAPIView):
    queryset = Dentist.objects.all()
    serializer_class = DentistSerializer
    permission_classes = [permissions.AllowAny]

class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'dentist':
            return Patient.objects.filter(dentist__user=self.request.user)
        return Patient.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class DentistViewSet(viewsets.ModelViewSet):
    serializer_class = DentistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Dentist.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class DentistPatientsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        dentist_id = request.user.id
        patients = Patient.objects.filter(dentist_id=dentist_id)
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

class DentistPatientDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, patient_id, format=None):
        dentist_id = request.user.id
        try:
            patient = Patient.objects.get(id=patient_id, dentist_id=dentist_id)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found or not assigned to this dentist.'}, status=404)

        serializer = PatientSerializer(patient)
        return Response(serializer.data)    

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'dentist':
            return Appointment.objects.filter(dentist__user=self.request.user)
        return Appointment.objects.filter(patient__user=self.request.user)

class NotesViewSet(viewsets.ModelViewSet):
    serializer_class = NotesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'dentist':
            return Notes.objects.filter(dentist__user=self.request.user)
        return Notes.objects.filter(patient__user=self.request.user)

class InvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'dentist':
            return Invoice.objects.filter(dentist__user=self.request.user)
        return Invoice.objects.filter(patient__user=self.request.user)
