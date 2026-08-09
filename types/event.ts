export interface EventNomination {
  id: string;
  title: string;
  type: string;
  description?: string;
  registration: boolean;
}

export interface Event {
  slug: string;
  title: string;

  shortDescription?: string;
  heroText?: string;

  city: string;
  venue?: string;
  address?: string;
  organizer?: string;

  status?: string;

  date: string;
  dateISO: string;

  image: string;

  featured?: boolean;

  categories: string[];

  participants: number;
  rating: number;

  registration: boolean;

  description?: string;

  nominations: EventNomination[];
}


