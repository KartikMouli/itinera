"use client"


export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Hey There!</h2>
                    <p className="text-gray-700">
                        Welcome to Itinera! We're not your typical boring travel app - we're the cool kids who actually care about your privacy!
                        While we can't promise to make your travel plans perfect (we're good, but we're not magicians), we can promise to treat
                        your data with the respect it deserves. No creepy stalking here - we're not your ex!
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. What We Know About You (Don't Panic!)</h2>
                    <p className="text-gray-700 mb-4">
                        We collect some basic info about you, but don't worry - we're not building a secret dossier for the CIA. Here's what we gather:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Your name (so we don't have to call you "Hey You!")</li>
                        <li>Your email (to send you cool stuff, not spam!)</li>
                        <li>Your travel preferences (because we're not mind readers... yet!)</li>
                        <li>Some technical stuff (boring, but necessary - like knowing if you're using a toaster or a computer to browse)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Info</h2>
                    <p className="text-gray-700 mb-4">
                        We promise to use your data for good, not evil! Here's what we do with it:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Make your travel planning less stressful than a Monday morning</li>
                        <li>Send you updates (only the important ones, we're not chatty!)</li>
                        <li>Help you when you're stuck (because we're nice like that)</li>
                        <li>Make our app better (we're always learning, just like you!)</li>
                        <li>Fix things when they break (because perfection is boring anyway)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Security? We Got You!</h2>
                    <p className="text-gray-700">
                        We protect your data like it's the last cookie in the jar! We've got security measures that would make Fort Knox jealous.
                        Your data is locked up tighter than a cat in a room full of rocking chairs.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Your Rights (Because You're the Boss!)</h2>
                    <p className="text-gray-700 mb-4">
                        You're in control! Here's what you can do:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                        <li>Ask to see what we know about you (no secrets here!)</li>
                        <li>Tell us to fix any mistakes (we're human, we make them too!)</li>
                        <li>Ask us to delete your data (we'll be sad, but we'll do it)</li>
                        <li>Tell us to stop using your data (your wish is our command!)</li>
                        <li>Take your data somewhere else (we won't take it personally!)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Need to Chat?</h2>
                    <p className="text-gray-700">
                        Questions? Concerns? Just want to say hi? We're all ears! (Well, not literally, that would be weird)
                        <br />
                        Email: privacy@itinera.com
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
                    <p className="text-gray-700">
                        We might update this policy from time to time (because change is good, right?). We'll let you know when we do,
                        and we'll update the date below. No sneaky changes here - we're not that kind of app!
                    </p>
                </section>

                <p className="text-sm text-gray-500 mt-8">
                    Last updated: {new Date().toLocaleDateString()} (We're fresh!)
                </p>
            </div>
        </div>
    )
} 