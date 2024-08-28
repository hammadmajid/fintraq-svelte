interface Amount {
  base: number,
  decimal?: number,
  mode: 'month' | 'year',
}

export enum PaymentType {
  Monthly,
  Yearly,
}

interface Tier {
  title: string;
  description: string;
  amount: (mode: PaymentType) => Amount;
  features: string[];
  action: string;
  button: "default" | "secondary";
}

export const tiers: Tier[] = [
  {
    title: "Free",
    description: "For students and hobiysts.",
    amount: function(mode: PaymentType): Amount {
      if (mode === PaymentType.Monthly) {
        return {
          base: 0,
          decimal: 0,
          mode: 'month'
        };
      } else {
        return {
          base: 0,
          decimal: 0,
          mode: 'year'
        };
      }
    },
    features: [
      "Unlimited account",
      "Unlimited records",
      "All available charts",
    ],
    action: "Start for free",
    button: "secondary",
  },
  {
    title: "Pro",
    description: "For enthusists who wanna have fun",
    amount: function(mode: PaymentType): Amount {
      if (mode === PaymentType.Monthly) {
        return {
          base: 5,
          decimal: 99,
          mode: 'month'
        };
      } else {
        return {
          base: 55,
          decimal: 99,
          mode: 'year'
        };
      }
    },
    features: [
      "Unlimited account",
      "Unlimited records",
      "All available charts",
      "Sync across all devices",
      "Priority support",
    ],
    action: "Get started",
    button: "default",
  },
  {
    title: "Premium",
    description: "For professionals who like more control",
    amount: function(mode: PaymentType): Amount {
      if (mode === PaymentType.Monthly) {
        return {
          base: 9,
          decimal: 99,
          mode: 'month'
        };
      } else {
        return {
          base: 99,
          decimal: 99,
          mode: 'year'
        };
      }
    },
    features: [
      "Unlimited account",
      "Unlimited records",
      "All available charts",
      "Sync across all devices",
      "Sync with external accounts",
      "Export data is multiple formats",
      "Priority support",
    ],
    action: "Get started",
    button: "default",
  },
];
