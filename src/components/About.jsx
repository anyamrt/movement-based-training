import profileImage from '../assets/images/profile-image.avif';
import heroImage from '../assets/images/image-3.avif';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Welcome to Movement Based Training
          </h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={profileImage}
                alt="James Ashford - Personal Trainer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-brand-dark">James Ashford</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              With almost 20 years experience training myself and 5 years as a professional,
              I've explored a lot of training methods; Landmines, Kettlebells, Bodyweight,
              Sandbags, Clubs, Maces, Ground based movements and more and have a hybrid
              approach to fitness that aims to improve capacity and attributes, instead of
              just adding reps and weight.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              I like to think of fitness as a <span className="font-semibold text-brand-primary">levelling up type of video game</span>
              {" "}— what skills are we looking to improve? Do we want to learn to flow with
              kettlebells or clubs, get stronger, become a better jumper, work on weak or
              perhaps painful links or just look a little better in the mirror? We can upgrade
              each of these attributes rather than focusing all our points on just one.
            </p>
          </div>
        </div>

        {/* What I Offer */}
        <div className="bg-brand-light rounded-3xl p-8 md:p-12 mb-16">
          <h3 className="text-3xl font-bold text-brand-dark mb-8 text-center">What I Offer</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Functional strength and mobility",
                description: "Tailored to your specific goals and needs"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                ),
                title: "Dynamic, varied sessions",
                description: "Combining kettlebells, landmine exercises, bodyweight drills, and more"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: "Movement quality, power, and endurance",
                description: "Training that improves all aspects of your fitness"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "True body awareness",
                description: "Learning how the body works as a system vs. individual muscles"
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-primary text-white rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-brand-dark mb-1">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Image Section */}
        <div className="mb-16 relative rounded-3xl overflow-hidden shadow-2xl h-80 md:h-96">
          <img
            src={heroImage}
            alt="Training in action"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
            <div className="p-8">
              <p className="text-white text-2xl md:text-3xl font-bold">
                Real training. Real results.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose This Approach */}
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-brand-dark mb-6">Why Choose This Approach?</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Many clients come looking for more than just a workout—they want a way to train
            that keeps things interesting and meaningful. This isn't about repetitive machines
            or chasing looks alone; it's about cultivating real ability through diverse,
            engaging movement that serves all parts of life.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We'll still focus on lifting weights and getting stronger, but include other
            methodologies based on your own needs and inclinations and focus on{" "}
            <span className="font-semibold text-brand-primary">leveling up your movement vocabulary</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
