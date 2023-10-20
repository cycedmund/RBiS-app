export const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    border: "1px solid #ccc",
    borderRadius: "4px",
    background: "gray",
    width: "120px",
  }),
};

export const statusOptions = [
  { value: "Annual Leave", label: "Annual Leave" },
  { value: "Bereavement", label: "Beareavement" },
  { value: "Light Duty", label: "Light Duty" },
  { value: "MC", label: "MC" },
  { value: "Present", label: "Present" },
];

const locations = [
  {
    label: "General",
    options: [
      { value: "Bunk", label: "Bunk" },
      { value: "Bball Court", label: "Bball Court" },
      { value: "Cookhouse", label: "Cookhouse" },
      { value: "Medical Centre", label: "Medical Centre" },
      { value: "Gym", label: "Gym" },
    ],
  },
  {
    label: "AFTC",
    options: [
      { value: "Matra", label: "Matra" },
      { value: "Ericsson", label: "Ericsson" },
      { value: "Raphael", label: "Raphael" },
      { value: "AWO Office", label: "AWO Office" },
      { value: "Audi", label: "Audi" },
      { value: "LT1", label: "LT1" },
      { value: "LT2", label: "LT2" },
      { value: "Hub", label: "Hub" },
    ],
  },
  {
    label: "3 DA Bn",
    options: [
      { value: "Hangar 3", label: "Hangar 3" },
      { value: "Hangar 4", label: "Hangar 4" },
      { value: "Hangar 5", label: "Hangar 5" },
      { value: "Weapon Store", label: "Weapon Store" },
      { value: "Ops Room", label: "Ops Room" },
      { value: "AR Room", label: "AR Room" },
      { value: "Bn Lec Room", label: "Bn Lec Room" },
    ],
  },
  {
    label: "18 DA Bn",
    options: [
      { value: "Hangar 1", label: "Hangar 1" },
      { value: "Hangar 2", label: "Hangar 2" },
      { value: "Ops Room", label: "Ops Room" },
      { value: "'A' LT1", label: "'A' LT1" },
      { value: "AR Room", label: "AR Room" },
      { value: "Audi", label: "Audi" },
    ],
  },
];

locations.forEach((group) => {
  group.options.sort((a, b) => a.label.localeCompare(b.label));
});

export const locationOptions = locations;
