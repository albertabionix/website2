import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Tilt from 'react-parallax-tilt';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/background.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        
 {/* Hero Content */}
        
        <div className="relative z-10 flex items-center justify-center h-full px-4 ">
          <Tilt glareEnable={true}
            glareMaxOpacity={1}
            scale={1.03}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            transitionSpeed={5000}
            perspective={500}
>

          
          <div
            className="
              relative
              max-w-4xl mx-auto
              rounded-3xl
              p-4 sm:p-8
              overflow-hidden
              backdrop-blur-sm
            "
            style={{"box-shadow": "inset 0px 0px 30px 0px #ccc"}}
          >
          
            
            <div className="relative z-10 inner-element">
              <div className="text-white mb-6 inner-element "> 
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight">
                  we are
                </div>
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  ALBERTA BIONIX
                </div>
              </div>
              <p className="text-white text-lg sm:text-xl md:text-2xl/tight max-w-2xl mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat libero sed purus cnvallis pharetra. Vestibulum faucibus magna quis convallis.
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Join us
              </Button>
            </div>
          </div>
          </Tilt>
        </div>

      </section>

      {/* Mission Statement Tickers */}
      <section className="bg-gray-100 py-4 overflow-hidden">
        <div className="whitespace-nowrap animate-scroll">
          <div className="inline-flex items-center space-x-8 text-sm sm:text-base text-gray-600 font-medium">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="flex items-center space-x-8">
                <span
                  className={cn(
                    "px-3 py-1",
                    i % 2 === 1
                      ? "text-red-600 font-semibold"
                      : "text-gray-500",
                  )}
                >
                  our mission
                </span>
                <span className="text-gray-300">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Headline */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-red-700 font-bold leading-tight">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                ENGINEER ACCESSIBILITY.
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2">
                PROTOTYPE SOLUTIONS.
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2">
                EMPOWER PEOPLE.
              </div>
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-4xl">
            <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl leading-relaxed">
              Established in 2018, Alberta Bionix is a student-led engineering
              project group dedicated to advancing mental and physical
              accessibility technologies in the healthcare industry. Our mission
              is to bridge the gap between engineering and medicine to create
              innovative solutions that improve the quality of life for patients
              - particularly those with disabilities or mobility challenges.
              Through collaboration with healthcare professionals, researchers,
              and organizations, we aim to make a lasting impact on patient
              care. As a club, we foster a hands-on, interdisciplinary learning
              environment where members can strengthen and refine their skills
              while contributing to impactful projects.
            </p>
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 lg:mt-20">
            <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 lg:p-16">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Ready to make an impact?
                </h3>
                <p className="text-lg sm:text-xl text-gray-600 mb-8">
                  Join our team of passionate engineers and researchers working
                  to create solutions that matter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg font-semibold"
                  >
                    Get Involved
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-red-700 text-red-700 hover:bg-red-50 px-8 py-3 text-lg font-semibold"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4">ALBERTA BIONIX</h4>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Engineering accessibility, prototyping solutions, and empowering
              people through innovative healthcare technology.
            </p>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                © 2024 Alberta Bionix. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
