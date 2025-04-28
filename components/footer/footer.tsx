import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t bg-background/50">
            <div className="container mx-auto px-12 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Itinera. All rights reserved.
                        </p>
                        <span className="text-muted-foreground">·</span>
                        <div className="flex items-center gap-2">
                            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Terms
                            </Link>
                            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Privacy
                            </Link>
                            <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Help
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground flex items-center">
                            Made with <Heart className="w-4 h-4 mx-1 text-rose-500 animate-pulse" /> by kartikmouli
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer