
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square, DollarSign, Calendar } from "lucide-react";
import { AddPropertyDialog } from "./add-property-dialog";

// Dummy property data
const dummyProperties = [
  {
    id: 1,
    title: "Modern Downtown Condo",
    address: "123 Main Street, Downtown, NY 10001",
    price: 750000,
    type: "residential",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    status: "available",
    description: "Beautiful modern condo with city views, recently renovated with high-end finishes.",
    ownerName: "Sarah Johnson",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Luxury Waterfront Villa",
    address: "456 Ocean Drive, Miami Beach, FL 33139",
    price: 2500000,
    type: "residential",
    bedrooms: 5,
    bathrooms: 4,
    area: 3800,
    status: "under_contract",
    description: "Stunning waterfront property with private pool and dock. Perfect for entertaining.",
    ownerName: "Michael Chen",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: 3,
    title: "Commercial Office Space",
    address: "789 Business Ave, Financial District, NY 10005",
    price: 3500000,
    type: "commercial",
    bedrooms: null,
    bathrooms: 6,
    area: 5000,
    status: "available",
    description: "Prime commercial office space in the heart of financial district. Recently renovated.",
    ownerName: "Commercial Properties LLC",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  },
  {
    id: 4,
    title: "Suburban Family Home",
    address: "321 Oak Lane, Suburbia, CA 90210",
    price: 950000,
    type: "residential",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    status: "sold",
    description: "Perfect family home in quiet neighborhood with great schools and large backyard.",
    ownerName: "Emily Rodriguez",
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: 5,
    title: "Vacant Land - Development Opportunity",
    address: "555 Future Development Rd, Austin, TX 78701",
    price: 450000,
    type: "land",
    bedrooms: null,
    bathrooms: null,
    area: 10000,
    status: "available",
    description: "Prime development land in growing area. Zoned for mixed-use development.",
    ownerName: "David Thompson",
    createdAt: "2024-01-11T11:20:00Z",
    updatedAt: "2024-01-11T11:20:00Z",
  },
  {
    id: 6,
    title: "Downtown Luxury Rental",
    address: "999 Skyline Ave, Chicago, IL 60601",
    price: 4500,
    type: "rental",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: "rented",
    description: "Luxury rental apartment with amazing city views and premium amenities.",
    ownerName: "Lisa Wang",
    createdAt: "2024-01-10T13:10:00Z",
    updatedAt: "2024-01-10T13:10:00Z",
  }
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "available": return "default";
    case "under_contract": return "secondary";
    case "sold": return "outline";
    case "rented": return "destructive";
    default: return "default";
  }
};

const getTypeBadgeVariant = (type: string) => {
  switch (type) {
    case "residential": return "default";
    case "commercial": return "secondary";
    case "land": return "outline";
    case "rental": return "destructive";
    default: return "default";
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function PropertiesPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground mt-2">
            Manage your real estate properties, listings, and inventory
          </p>
        </div>
        <AddPropertyDialog/>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyProperties.length}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Badge variant="default" className="h-4 w-4 p-0">
              <div className="h-2 w-2 rounded-full bg-current" />
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyProperties.filter(p => p.status === "available").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for sale/rent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Contract</CardTitle>
            <Badge variant="secondary" className="h-4 w-4 p-0">
              <div className="h-2 w-2 rounded-full bg-current" />
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyProperties.filter(p => p.status === "under_contract").length}
            </div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dummyProperties.reduce((sum, prop) => sum + (prop.price || 0), 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Portfolio value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProperties.map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg line-clamp-2">{property.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant={getTypeBadgeVariant(property.type)}>
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(property.status)}>
                      {property.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Price */}
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(property.price || 0)}
                {property.type === "rental" && <span className="text-sm font-normal text-muted-foreground">/month</span>}
              </div>

              {/* Address */}
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground line-clamp-2">{property.address}</span>
              </div>

              {/* Property Details */}
              <div className="flex items-center justify-between text-sm">
                {property.bedrooms && (
                  <div className="flex items-center space-x-1">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center space-x-1">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center space-x-1">
                    <Square className="h-4 w-4 text-muted-foreground" />
                    <span>{property.area.toLocaleString()} sq ft</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div className="text-sm text-muted-foreground">
                  <p className="line-clamp-2">{property.description}</p>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Added {formatDate(property.createdAt)}</span>
                </div>
                
                {property.ownerName && (
                  <Badge variant="outline" className="text-xs">
                    {property.ownerName}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  {property.status === "available" ? "Contact Owner" : "View Status"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}