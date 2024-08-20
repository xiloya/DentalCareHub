from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import (
    DentistPatientDetailView,
    RegisterDentistView,
    RegisterPatientView,
    RegisterView, 
    PatientViewSet, 
    DentistViewSet, 
    DentistPatientsView, 
    AppointmentViewSet, 
    NotesViewSet, 
    InvoiceViewSet
)

router = DefaultRouter()
router.register(r'patients', PatientViewSet, basename='patient')
router.register(r'dentists', DentistViewSet, basename='dentist')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'notes', NotesViewSet, basename='note')
router.register(r'invoices', InvoiceViewSet, basename='invoice')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegisterView.as_view(), name='register'),
    path('register/patient/', RegisterPatientView.as_view(), name='register_patient'),
    path('register/dentist/', RegisterDentistView.as_view(), name='register_dentist'),
    path('dentist/patients/', DentistPatientsView.as_view(), name='dentist_patients'),
    path('dentist/patients/<int:patient_id>/', DentistPatientDetailView.as_view(), name='dentist_patient_detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
