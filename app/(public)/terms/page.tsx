

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. The Boring Legal Stuff (But We Made It Fun!)</h2>
          <p className="text-gray-700">
            Welcome to Itinera! By using our app, you&apos;re agreeing to these terms. Don&apos;t worry, we&apos;ve made them as painless as possible. 
            Think of this as a friendly agreement between you and us - like a digital handshake, but without the awkward eye contact.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. What You Can Do (The Fun Part!)</h2>
          <p className="text-gray-700 mb-4">
            Here&apos;s what you&apos;re allowed to do with our app:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Use it to plan your awesome adventures</li>
            <li>Share your travel plans with friends (because bragging rights are important!)</li>
            <li>Save your favorite destinations (we won't judge your travel taste)</li>
            <li>Use it on any device you own (yes, even that ancient tablet in your drawer)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. What You Can&apos;t Do (The Party Pooper Section)</h2>
          <p className="text-gray-700 mb-4">
            Please don&apos;t:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Try to hack our app (we&apos;re not that interesting anyway)</li>
            <li>Use it for anything illegal (we&apos;re not your getaway driver)</li>
            <li>Share your account with everyone you know (this isn&apos;t Netflix)</li>
            <li>Try to break our servers (they&apos;re sensitive)</li>
            <li>Spam other users (nobody likes a spammer)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Our Responsibilities (We Promise to Be Cool)</h2>
          <p className="text-gray-700 mb-4">
            We&apos;ll do our best to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Keep the app running smoothly (most of the time)</li>
            <li>Fix bugs when we find them (we&apos;re not perfect, but we try)</li>
            <li>Keep your data safe (we take security seriously)</li>
            <li>Listen to your feedback (we actually read those emails)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. The Money Talk (Don&apos;t Worry, It&apos;s Not Bad)</h2>
          <p className="text-gray-700">
            Some features might cost money, but we&apos;ll always tell you before you have to pay. 
            No surprise charges here - we&apos;re not your ex&apos;s credit card company!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Changes to These Terms</h2>
          <p className="text-gray-700">
            We might update these terms from time to time. Don&apos;t worry, we won&apos;t make any crazy changes. 
            If we do make significant changes, we&apos;ll let you know (we&apos;re not sneaky like that).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. The "We&apos;re Not Responsible For" Section</h2>
          <p className="text-gray-700 mb-4">
            We&apos;re not responsible for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Your travel plans going wrong (we&apos;re good, but we&apos;re not fortune tellers)</li>
            <li>Bad weather during your trip (we can&apos;t control Mother Nature)</li>
            <li>Your friend canceling last minute (that&apos;s on them, not us)</li>
            <li>You forgetting to pack your toothbrush (classic rookie mistake)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Need to Talk?</h2>
          <p className="text-gray-700">
            Questions about these terms? Just want to chat? We&apos;re here for you!
            <br />
            Email: terms@itinera.com
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()} (Still fresh and relevant!)
        </p>
      </div>
    </div>
  )
} 