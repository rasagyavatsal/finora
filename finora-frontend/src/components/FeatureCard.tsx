interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
  }
  
  export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <img 
          src={`${process.env.PUBLIC_URL}/images/feature-icons/${icon}`} 
          alt={title}
          className="h-12 w-12 mb-4"
        />
        <h3 className="text-xl font-semibold text-finora-gray mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }