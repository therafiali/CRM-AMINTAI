// src/features/deals/data/dummy-deals-data.ts
export interface Deal {
    id: number;
    title: string;
    contactName: string;
    contactEmail: string;
    propertyAddress: string;
    propertyPrice: number;
    stage: string;
    lastActivity: string;
    priority: 'high' | 'medium' | 'low'; // ← ADDED
    followUpDate?: string; // ← ADDED
}



// Update ALL deals in dummy-deals-data.ts with priorities
export const dummyDeals: Deal[] = [
    // Called Stage
    {
        id: 1,
        title: "Downtown Condo Purchase",
        contactName: "Sarah Johnson",
        contactEmail: "sarah@email.com",
        propertyAddress: "123 Main St, New York, NY 10001",
        propertyPrice: 750000,
        stage: "called",
        lastActivity: "2024-01-15",
        priority: "high",
        followUpDate: "2024-01-16"
    },
    {
        id: 2,
        title: "Lakeside Family Home",
        contactName: "James Wilson",
        contactEmail: "james@email.com",
        propertyAddress: "456 Lakeview Dr, Austin, TX 78701",
        propertyPrice: 650000,
        stage: "called",
        lastActivity: "2024-01-14",
        priority: "medium",
        followUpDate: "2024-01-18"
    },
    {
        id: 3,
        title: "Urban Loft Apartment",
        contactName: "Maria Garcia",
        contactEmail: "maria@email.com",
        propertyAddress: "789 Loft St, Chicago, IL 60601",
        propertyPrice: 420000,
        stage: "called",
        lastActivity: "2024-01-16",
        priority: "low",
    },
    {
        id: 4,
        title: "Suburban Duplex",
        contactName: "Thomas Lee",
        contactEmail: "thomas@email.com",
        propertyAddress: "321 Duplex Ave, Phoenix, AZ 85001",
        propertyPrice: 580000,
        stage: "called",
        lastActivity: "2024-01-13",
        priority: "medium",
    },

    // Answer Stage
    {
        id: 5,
        title: "Mountain View Cabin",
        contactName: "Jennifer Park",
        contactEmail: "jennifer@email.com",
        propertyAddress: "555 Mountain Rd, Denver, CO 80201",
        propertyPrice: 890000,
        stage: "answer",
        lastActivity: "2024-01-12",
        priority: "high",
        followUpDate: "2024-01-13"
    },
    {
        id: 6,
        title: "Beachfront Studio",
        contactName: "Kevin Martinez",
        contactEmail: "kevin@email.com",
        propertyAddress: "777 Beach Blvd, Miami, FL 33101",
        propertyPrice: 320000,
        stage: "answer",
        lastActivity: "2024-01-17",
        priority: "medium",
    },
    {
        id: 7,
        title: "Family Home Sale",
        contactName: "Mike Chen",
        contactEmail: "mike@email.com",
        propertyAddress: "456 Oak Ave, Brooklyn, NY 11201",
        propertyPrice: 950000,
        stage: "answer",
        lastActivity: "2024-01-14",
        priority: "high",
        followUpDate: "2024-01-15"
    },

    // Poweroff Stage
    {
        id: 8,
        title: "Downtown Office Space",
        contactName: "Amanda White",
        contactEmail: "amanda@email.com",
        propertyAddress: "888 Business St, Seattle, WA 98101",
        propertyPrice: 1200000,
        stage: "poweroff",
        lastActivity: "2024-01-15",
        priority: "medium",
    },
    {
        id: 9,
        title: "Garden View Townhouse",
        contactName: "Daniel Kim",
        contactEmail: "daniel@email.com",
        propertyAddress: "234 Garden Ln, Portland, OR 97201",
        propertyPrice: 720000,
        stage: "poweroff",
        lastActivity: "2024-01-13",
        priority: "low",
    },

    // Not Answering Stage
    {
        id: 10,
        title: "Historic Brownstone",
        contactName: "Rachel Green",
        contactEmail: "rachel@email.com",
        propertyAddress: "567 Historic St, Boston, MA 02101",
        propertyPrice: 1850000,
        stage: "not_answering",
        lastActivity: "2024-01-16",
        priority: "low",
    },
    {
        id: 11,
        title: "Modern Penthouse",
        contactName: "Alex Turner",
        contactEmail: "alex@email.com",
        propertyAddress: "999 Skyline Ave, Los Angeles, CA 90001",
        propertyPrice: 2200000,
        stage: "not_answering",
        lastActivity: "2024-01-12",
        priority: "medium",
    },

    // Followup Stage
    {
        id: 12,
        title: "Luxury Villa",
        contactName: "Emily Davis",
        contactEmail: "emily@email.com",
        propertyAddress: "789 Beach Rd, Miami Beach, FL 33139",
        propertyPrice: 2500000,
        stage: "followup",
        lastActivity: "2024-01-13",
        priority: "high",
        followUpDate: "2024-01-14"
    },
    {
        id: 13,
        title: "Waterfront Condo",
        contactName: "Brian Clark",
        contactEmail: "brian@email.com",
        propertyAddress: "123 Harbor View, San Diego, CA 92101",
        propertyPrice: 1100000,
        stage: "followup",
        lastActivity: "2024-01-14",
        priority: "high",
        followUpDate: "2024-01-15"
    },
    {
        id: 14,
        title: "Country Estate",
        contactName: "Olivia Brown",
        contactEmail: "olivia@email.com",
        propertyAddress: "456 Country Rd, Nashville, TN 37201",
        propertyPrice: 1950000,
        stage: "followup",
        lastActivity: "2024-01-15",
        priority: "medium",
    },

    // Detail Send WhatsApp Stage
    {
        id: 15,
        title: "City View Apartment",
        contactName: "Michael Scott",
        contactEmail: "michael@email.com",
        propertyAddress: "789 Urban Ave, Dallas, TX 75201",
        propertyPrice: 680000,
        stage: "detail_send_whatsapp",
        lastActivity: "2024-01-16",
        priority: "medium",
    },
    {
        id: 16,
        title: "Commercial Space",
        contactName: "David Wilson",
        contactEmail: "david@email.com",
        propertyAddress: "321 Business Blvd, Houston, TX 77001",
        propertyPrice: 3500000,
        stage: "detail_send_whatsapp",
        lastActivity: "2024-01-12",
        priority: "high",
        followUpDate: "2024-01-13"
    },
    {
        id: 17,
        title: "Tech Office Building",
        contactName: "Sophia Rodriguez",
        contactEmail: "sophia@email.com",
        propertyAddress: "654 Tech Park, San Francisco, CA 94101",
        propertyPrice: 4800000,
        stage: "detail_send_whatsapp",
        lastActivity: "2024-01-13",
        priority: "high",
        followUpDate: "2024-01-14"
    },

    // Meeting Aligned Stage
    {
        id: 18,
        title: "Retail Storefront",
        contactName: "William Taylor",
        contactEmail: "william@email.com",
        propertyAddress: "987 Retail St, Las Vegas, NV 89101",
        propertyPrice: 2200000,
        stage: "meeting_aligned",
        lastActivity: "2024-01-14",
        priority: "high",
        followUpDate: "2024-01-15"
    },
    {
        id: 19,
        title: "Medical Office",
        contactName: "Jessica Moore",
        contactEmail: "jessica@email.com",
        propertyAddress: "159 Medical Plaza, Atlanta, GA 30301",
        propertyPrice: 1800000,
        stage: "meeting_aligned",
        lastActivity: "2024-01-15",
        priority: "medium",
    },

    // Visited Stage
    {
        id: 20,
        title: "Suburban House",
        contactName: "Lisa Brown",
        contactEmail: "lisa@email.com",
        propertyAddress: "555 Suburb Ln, San Jose, CA 95101",
        propertyPrice: 850000,
        stage: "visited",
        lastActivity: "2024-01-11",
        priority: "high",
        followUpDate: "2024-01-12"
    },
    {
        id: 21,
        title: "Golf Course Home",
        contactName: "Richard Davis",
        contactEmail: "richard@email.com",
        propertyAddress: "777 Fairway Dr, Orlando, FL 32801",
        propertyPrice: 1250000,
        stage: "visited",
        lastActivity: "2024-01-12",
        priority: "medium",
    },

    // Interested Stage
    {
        id: 22,
        title: "University Condo",
        contactName: "Michelle Lee",
        contactEmail: "michelle@email.com",
        propertyAddress: "888 College Ave, Philadelphia, PA 19101",
        propertyPrice: 450000,
        stage: "interested",
        lastActivity: "2024-01-13",
        priority: "high",
        followUpDate: "2024-01-14"
    },
    {
        id: 23,
        title: "Apartment Rental",
        contactName: "Robert Taylor",
        contactEmail: "robert@email.com",
        propertyAddress: "777 City Apt, Chicago, IL 60601",
        propertyPrice: 450000,
        stage: "interested",
        lastActivity: "2024-01-10",
        priority: "medium",
    },

    // Token Stage
    {
        id: 24,
        title: "Luxury Condo Sale",
        contactName: "Jennifer Lopez",
        contactEmail: "jennifer@email.com",
        propertyAddress: "444 Luxury Tower, Beverly Hills, CA 90210",
        propertyPrice: 3200000,
        stage: "token",
        lastActivity: "2024-01-09",
        priority: "high",
        followUpDate: "2024-01-10"
    },

    // Closed Won Stage
    {
        id: 25,
        title: "Investment Property",
        contactName: "Christopher Evans",
        contactEmail: "chris@email.com",
        propertyAddress: "222 Investment St, Charlotte, NC 28201",
        propertyPrice: 750000,
        stage: "closed_won",
        lastActivity: "2024-01-08",
        priority: "low",
    },

    // Closed Loss Stage
    {
        id: 26,
        title: "Mountain Retreat",
        contactName: "Amanda Smith",
        contactEmail: "amanda@email.com",
        propertyAddress: "333 Mountain Peak, Salt Lake City, UT 84101",
        propertyPrice: 920000,
        stage: "closed_loss",
        lastActivity: "2024-01-07",
        priority: "low",
    },

    // Not Interested Stage
    {
        id: 27,
        title: "Downtown Studio",
        contactName: "Mark Johnson",
        contactEmail: "mark@email.com",
        propertyAddress: "666 Studio St, Detroit, MI 48201",
        propertyPrice: 280000,
        stage: "not_interested",
        lastActivity: "2024-01-06",
        priority: "low",
    }
];






export const pipelineStages = [
    { id: "called", name: "Called", color: "bg-gray-100" },
    { id: "answer", name: "Answer", color: "bg-blue-100" },
    { id: "poweroff", name: "Power Off", color: "bg-yellow-100" },
    { id: "not_answering", name: "Not Answering", color: "bg-orange-100" },
    { id: "followup", name: "Follow Up", color: "bg-purple-100" },
    { id: "detail_send_whatsapp", name: "Detail Send WhatsApp", color: "bg-green-100" },
    { id: "meeting_aligned", name: "Meeting Aligned", color: "bg-teal-100" },
    { id: "visited", name: "Visited", color: "bg-indigo-100" },
    { id: "interested", name: "Interested", color: "bg-pink-100" },
    { id: "not_interested", name: "Not Interested", color: "bg-red-100" },
    { id: "token", name: "Token", color: "bg-amber-100" },
    { id: "closed_won", name: "Closed Won", color: "bg-emerald-100" },
    { id: "closed_loss", name: "Closed Loss", color: "bg-rose-100" }
];



export const extractLocation = (address: string): string => {
    const parts = address.split(',');
    if (parts.length >= 2) {
        // Get city and state (usually parts[1] and parts[2])
        const city = parts[1]?.trim() || '';
        const state = parts[2]?.trim() || '';
        return `${city}${state ? ', ' + state : ''}`;
    }
    return 'Unknown';
};



export const groupedStages = [
  {
    id: "initial_contact",
    name: "Initial Contact",
    color: "bg-blue-50",
    stages: ["called", "answer", "poweroff", "not_answering"]
  },
  {
    id: "follow_up", 
    name: "Follow Up",
    color: "bg-yellow-50",
    stages: ["followup", "detail_send_whatsapp"]
  },
  {
    id: "meetings",
    name: "Meetings",
    color: "bg-purple-50", 
    stages: ["meeting_aligned", "visited"] 
  },
  {
    id: "negotiation",
    name: "Negotiation",
    color: "bg-orange-50", 
    stages: ["interested", "token"]
  },
  {
    id: "closed",
    name: "Closed",
    color: "bg-gray-50",
    stages: ["closed_won", "closed_loss", "not_interested"]
  }
] as const;