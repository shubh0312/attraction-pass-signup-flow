
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MapPin, Gift, Plane, Camera, Mountain, Building2, Phone, Mail, User, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AttractionPass {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const mockAttractionPasses: AttractionPass[] = [
  {
    id: '1',
    title: 'City Explorer Pass',
    description: 'Discover urban attractions, museums, and cultural sites with exclusive discounts.',
    image: '/placeholder.svg',
    icon: <Building2 className="w-6 h-6" />
  },
  {
    id: '2',
    title: 'Adventure Seeker Pass',
    description: 'Get discounts on outdoor activities, hiking tours, and adventure sports.',
    image: '/placeholder.svg',
    icon: <Mountain className="w-6 h-6" />
  },
  {
    id: '3',
    title: 'Photography Pass',
    description: 'Access scenic viewpoints and photography spots with special rates.',
    image: '/placeholder.svg',
    icon: <Camera className="w-6 h-6" />
  }
];

type Step = 'registration' | 'pass-selection' | 'congratulations';

const RegistrationFlow = () => {
  const [currentStep, setCurrentStep] = useState<Step>('registration');
  const [selectedPass, setSelectedPass] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    code: '',
    isOTPSent: false,
    otp: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendOTP = () => {
    if (formData.mobile.length >= 10) {
      setFormData(prev => ({ ...prev, isOTPSent: true }));
      toast({
        title: "OTP Sent!",
        description: "Please check your mobile for the verification code.",
      });
    }
  };

  const handleSubmitRegistration = () => {
    // Simulate code verification
    if (formData.name && formData.email && formData.code && formData.otp) {
      // If code is linked to multiple passes, show selection
      if (mockAttractionPasses.length > 1) {
        setCurrentStep('pass-selection');
      } else {
        setCurrentStep('congratulations');
      }
      toast({
        title: "Registration Successful!",
        description: "Your code has been verified.",
      });
    }
  };

  const handlePassSelection = (passId: string) => {
    setSelectedPass(passId);
    setCurrentStep('congratulations');
    toast({
      title: "Pass Selected!",
      description: "Your Attraction Pass has been activated.",
    });
  };

  const ConfettiAnimation = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="confetti-piece animate-confetti" />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header Banner */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <Plane className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Register your code and unlock discounted experiences with the Attraction Pass!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The Attraction Pass includes a collection of discount coupon codes you can use to book top attractions during your upcoming trip.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === 'registration' && (
          <Card className="trip-card animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Complete Your Registration
              </CardTitle>
              <CardDescription className="text-base">
                Fill in your details to activate your Attraction Pass
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-12 rounded-xl border-gray-200 focus:border-primary-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12 rounded-xl border-gray-200 focus:border-primary-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="+1234567890"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      className="h-12 rounded-xl border-gray-200 focus:border-primary-500"
                    />
                    <Button
                      onClick={handleSendOTP}
                      disabled={formData.mobile.length < 10}
                      variant="outline"
                      className="h-12 px-6 rounded-xl border-primary-200 text-primary-600 hover:bg-primary-50"
                    >
                      Send OTP
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    OTP Verification
                  </label>
                  <Input
                    placeholder="Enter OTP"
                    value={formData.otp}
                    onChange={(e) => handleInputChange('otp', e.target.value)}
                    disabled={!formData.isOTPSent}
                    className="h-12 rounded-xl border-gray-200 focus:border-primary-500 disabled:bg-gray-50"
                  />
                  {formData.isOTPSent && (
                    <p className="text-sm text-primary-600">OTP sent to your mobile number</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Attraction Pass Code
                </label>
                <Input
                  placeholder="Enter your received code"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-primary-500"
                />
              </div>

              <Button
                onClick={handleSubmitRegistration}
                className="w-full h-12 trip-button bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-base font-medium"
                disabled={!formData.name || !formData.email || !formData.code || !formData.otp}
              >
                Verify & Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 'pass-selection' && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your Attraction Pass
              </h2>
              <p className="text-lg text-gray-600">
                Your code is valid for multiple passes. Select the one that best fits your travel plans.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {mockAttractionPasses.map((pass) => (
                <Card 
                  key={pass.id} 
                  className="trip-card cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handlePassSelection(pass.id)}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {pass.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {pass.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center mb-6">
                      {pass.description}
                    </p>
                    <Button className="w-full trip-button bg-secondary-500 hover:bg-secondary-600 text-white rounded-xl">
                      Select This Pass
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'congratulations' && (
          <div className="animate-fade-in">
            <ConfettiAnimation />
            <Card className="trip-card text-center max-w-2xl mx-auto">
              <CardContent className="py-12">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-primary-600" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  🎉 Your Attraction Pass is activated!
                </h2>
                
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Congratulations! You can now access exclusive discounts and special offers for top attractions. Start planning your amazing journey!
                </p>

                <div className="space-y-4">
                  <Button 
                    className="w-full sm:w-auto trip-button bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-lg px-8 py-4"
                    onClick={() => window.open('https://tripxoxo.com/profile', '_blank')}
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    View Attraction Pass Codes
                  </Button>
                  
                  <div className="flex justify-center">
                    <Badge variant="secondary" className="bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full">
                      <MapPin className="w-4 h-4 mr-1" />
                      Ready for your next adventure!
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationFlow;
