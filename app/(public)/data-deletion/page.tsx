import { Metadata } from "next"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Data Deletion | Itinera",
  description: "Instructions for deleting your data from Itinera",
}

export default function DataDeletion() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Data Deletion Instructions</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Delete Your Data</h2>
          <p className="text-gray-700 mb-4">
            We respect your privacy and make it easy to delete your data from Itinera. Here's how you can do it:
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Email Deletion Request</CardTitle>
              <CardDescription>Send us an email to request data deletion</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Send an email to <span className="font-semibold">kartikmouli0@gmail.com</span> with the subject line "Data Deletion Request" and include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Your full name</li>
                <li>The email address associated with your account</li>
                <li>Your Facebook ID (if you used Facebook login)</li>
                <li>Any specific data you want deleted (or "all data" for complete deletion)</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What Happens After Your Request</h2>
          <Card>
            <CardHeader>
              <CardTitle>Deletion Process</CardTitle>
              <CardDescription>What to expect after submitting your request</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>We'll send you a confirmation email within 48 hours</li>
                <li>Your data will be permanently deleted within 30 days</li>
                <li>You'll receive a final confirmation when the deletion is complete</li>
                <li>Any backups containing your data will be updated within 90 days</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data We Delete</h2>
          <Card>
            <CardHeader>
              <CardTitle>Data Removal</CardTitle>
              <CardDescription>Information that will be permanently deleted</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Your personal information (name, email, etc.)</li>
                <li>Your travel preferences and saved destinations</li>
                <li>Your activity history</li>
                <li>Any content you've created</li>
                <li>Your authentication data (including Facebook OAuth tokens)</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data We Keep</h2>
          <Card>
            <CardHeader>
              <CardTitle>Retained Data</CardTitle>
              <CardDescription>Information that may be retained for legal purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Transaction records (if you made any purchases)</li>
                <li>Records of your data deletion request</li>
                <li>Any data required by law to be maintained</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get assistance with the data deletion process</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                If you have any questions about the data deletion process, please contact us at:
                <br />
                Email: kartikmouli0@gmail.com
              </p>
            </CardContent>
          </Card>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
} 