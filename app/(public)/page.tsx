import {buttonVariants} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface featureProps {
    title: string;
    description: string;
    icon: string;
}

const features: featureProps[] = [
    {
        title: "Cours complets",
        description: "Accédez à un large éventail de cours soigneusement sélectionnés et conçus par des experts du secteur.",
        icon: "📖",
    },
    {
        title: "Apprentissage interactif",
        description: "Participez à des contenus interactifs, des quiz et des devoirs pour améliorer votre expérience d'apprentissage.",
        icon: "🎮",
    },
    {
        title: "Suivi des progrès",
        description: "Suivez vos progrès et vos réalisations grâce à des analyses détaillées et des tableaux de bord personnalisés.",
        icon: "📊",
    },
    {
        title: "Soutien communautaire",
        description: "Rejoignez une communauté dynamique d'apprenants et d'enseignants pour collaborer et partager vos connaissances.",
        icon: "👥",
    }
]

export default function Home() {
    return (
        <>
            <section className="relative py-20">
                <div className="flex flex-col items-center text-center space-y-8">
                    <Badge variant="outline">Le futur de l'enseignement en ligne</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Boostez votre expérience d'apprentissage</h1>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        Découvrez une nouvelle façon d'apprendre grâce à notre système de gestion de l'apprentissage moderne et interactif.
                        Accédez à des cours de haute qualité à tout moment, où que vous soyez.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link className={buttonVariants({size: "lg"})} href="/courses">Explorer les cours</Link>
                        <Link className={buttonVariants({size: "lg", variant: "outline"})} href="/login">Se connecter</Link>
                    </div>
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                {features.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <CardTitle>{feature.title}</CardTitle>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </section>
        </>
    );
}
