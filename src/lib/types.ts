export interface Power {
  id: string;
  name: string;
  description: string;
}

export interface Origin {
  id: string;
  name: string;
  description: string;
  icon: string;
  impact: number;
  powers: Power[];
}
