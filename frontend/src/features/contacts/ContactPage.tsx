
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, DollarSign, Calendar } from "lucide-react";
import { AddContactDialog } from "./AddContactDailod";

// Dummy contact data
const dummyContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    type: "buyer" as const,
    budget: 750000,
    notes: "Looking for a 3-4 bedroom house with backyard",
    assignedToName: "John Smith",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+1 (555) 987-6543",
    type: "seller" as const,
    budget: null,
    notes: "Selling downtown condo, needs quick sale",
    assignedToName: "Jane Doe",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "+1 (555) 456-7890",
    type: "both" as const,
    budget: 550000,
    notes: "First-time home buyer, also selling current apartment",
    assignedToName: "John Smith",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  },
  {
    id: 4,
    name: "David Thompson",
    email: null,
    phone: "+1 (555) 234-5678",
    type: "tenant" as const,
    budget: 2500,
    notes: "Looking for 2-bedroom rental, pet-friendly",
    assignedToName: null,
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    phone: "+1 (555) 345-6789",
    type: "buyer" as const,
    budget: 1200000,
    notes: "Interested in luxury properties with waterfront",
    assignedToName: "Jane Doe",
    createdAt: "2024-01-11T11:20:00Z",
    updatedAt: "2024-01-11T11:20:00Z",
  },
  {
    id: 6,
    name: "Robert Martinez",
    email: "robert.m@example.com",
    phone: null,
    type: "seller" as const,
    budget: null,
    notes: "Commercial property owner, selling office building",
    assignedToName: "John Smith",
    createdAt: "2024-01-10T13:10:00Z",
    updatedAt: "2024-01-10T13:10:00Z",
  }
];

const getTypeBadgeVariant = (type: string) => {
  switch (type) {
    case "buyer": return "default";
    case "seller": return "secondary";
    case "both": return "outline";
    case "tenant": return "destructive";
    default: return "default";
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function ContactsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground mt-2">
            Manage your real estate contacts, buyers, sellers, and tenants
          </p>
        </div>
        <AddContactDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyContacts.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buyers</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyContacts.filter(c => c.type === "buyer" || c.type === "both").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active prospects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sellers</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyContacts.filter(c => c.type === "seller" || c.type === "both").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Property listings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenants</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M8 7v7" />
              <path d="M12 7v4" />
              <path d="M16 7v9" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dummyContacts.filter(c => c.type === "tenant").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Rental clients
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <Badge variant={getTypeBadgeVariant(contact.type)} className="mt-1">
                      {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Contact Info */}
              <div className="space-y-2">
                {contact.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{contact.phone}</span>
                  </div>
                )}
                {contact.budget && (
                  <div className="flex items-center space-x-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Budget: {formatCurrency(contact.budget)}
                    </span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {contact.notes && (
                <div className="text-sm text-muted-foreground">
                  <p className="line-clamp-2">{contact.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Added {formatDate(contact.createdAt)}</span>
                </div>
                
                {contact.assignedToName && (
                  <Badge variant="outline" className="text-xs">
                    {contact.assignedToName}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (commented out since we have dummy data) */}
      {/* <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-muted-foreground/50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold">No contacts yet</h3>
        <p className="text-muted-foreground mt-2">
          Get started by adding your first contact.
        </p>
        <div className="mt-6">
          <AddContactDialog />
        </div>
      </div> */}
    </div>
  );
}