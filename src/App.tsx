import { Phone, FileText } from 'lucide-react';

function App() {
  const handleWhatsAppClick = (number: string) => {
    window.open(`https://wa.me/91${number}`, '_blank');
  };

  const handleVerificationForm = async () => {
    const userName = prompt('Enter your name:');
    if (!userName) return;

    const userPhone = prompt('Enter your phone number:');
    if (!userPhone) return;

    const userEmail = prompt('Enter your email address:');
    if (!userEmail) return;

    const loanAmount = prompt('Enter required loan amount:');
    if (!loanAmount) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verification-form`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userName,
            phone: userPhone,
            email: userEmail,
            loanAmount: loanAmount,
          }),
        }
      );

      if (response.ok) {
        alert('Verification form submitted successfully! Check your email for confirmation.');
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 25%, #fef3c7 50%, #fef2f2 75%, #f5f3ff 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradient 15s ease infinite'
    }}>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
        }
        .float-decoration {
          animation: float 6s ease-in-out infinite;
        }
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-decoration"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-decoration" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 left-1/2 w-40 h-40 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 float-decoration" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-emerald-400 pulse-glow">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-2xl"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tight drop-shadow-lg" style={{textShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                LEND MONEY
              </h1>
              <div className="h-1 w-40 bg-yellow-300 mx-auto rounded-full shadow-lg mb-4"></div>
              <p className="text-white text-xl md:text-2xl mt-4 font-bold">Quick & Easy Loans</p>
              <p className="text-emerald-50 text-sm mt-2">Trusted lending at best rates</p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Interest Rates
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border-3 border-emerald-200 hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-full font-black text-2xl shadow-lg">
                    ₹5,000
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border-l-4 border-emerald-600">
                    <span className="font-bold text-gray-800">10 Days</span>
                    <span className="text-3xl font-black text-emerald-600">₹600</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border-l-4 border-emerald-600">
                    <span className="font-bold text-gray-800">15 days</span>
                    <span className="text-3xl font-black text-emerald-600">₹900</span>
                  </div>
                </div>
              </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border-3 border-emerald-200 hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-full font-black text-2xl shadow-lg">
                    ₹10,000
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border-l-4 border-emerald-600">
                    <span className="font-bold text-gray-800">10 Days</span>
                    <span className="text-3xl font-black text-emerald-600">₹1,000</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border-l-4 border-emerald-600">
                    <span className="font-bold text-gray-800">15 days</span>
                    <span className="text-3xl font-black text-emerald-600">₹1300</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 border-3 border-teal-200 hover:shadow-2xl hover:border-teal-400 transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-full font-black text-2xl shadow-lg">
                    ₹15,000
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border-l-4 border-teal-600">
                    <span className="font-bold text-gray-800">10 Days</span>
                    <span className="text-3xl font-black text-teal-600">₹1,200</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border-l-4 border-teal-600">
                    <span className="font-bold text-gray-800">15 days</span>
                    <span className="text-3xl font-black text-teal-600">₹1,500</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-10 text-white mb-8 shadow-xl">
              <h3 className="text-3xl font-black text-center mb-8">Contact Us on WhatsApp</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleWhatsAppClick('7416784935')}
                  className="bg-white text-emerald-700 px-6 py-5 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all transform hover:scale-110 active:scale-95 shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl"
                >
                  <Phone className="w-7 h-7" />
                  <span>7416784935</span>
                </button>
                <button
                  onClick={() => handleWhatsAppClick('6303760197')}
                  className="bg-white text-teal-700 px-6 py-5 rounded-2xl font-black text-lg hover:bg-teal-50 transition-all transform hover:scale-110 active:scale-95 shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl"
                >
                  <Phone className="w-7 h-7" />
                  <span>6303760197</span>
                </button>
              </div>
              <p className="text-center text-white text-sm mt-8 font-semibold">
                Click on any number to start a WhatsApp chat instantly
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-3xl p-10 text-white shadow-xl">
              <h3 className="text-3xl font-black text-center mb-4">Verification Required</h3>
              <p className="text-center text-blue-50 text-base mb-8 font-semibold">
                Complete your verification form to get started with the loan process
              </p>
              <button
                onClick={handleVerificationForm}
                className="w-full bg-white text-blue-700 px-6 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl"
              >
                <FileText className="w-7 h-7" />
                <span>Fill Verification Form</span>
              </button>
              <p className="text-center text-blue-100 text-sm mt-6 font-medium">
                Form responses will be sent to adityavantharam999@gmail.com
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 text-center text-gray-600 text-sm">
            <p>Quick approval • Flexible terms • Trusted service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
