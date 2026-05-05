const defaultPartners = [
  "bKash",
  "Apex",
  "Walton",
  "IFAD",
  "Jamuna",
  "Sailor",
  "Othoba",
  "Lotto",
  "HT Bazar",
  "Naturo",
  "Ghorer Bazar",
  "Online Tech Academy",
];

export const Partnership = ({
  title = "Brands Love To Work With Us",
  partners = defaultPartners,
}) => {
  return (
    <section className="container mx-auto pad-horizontal section-default">
      <h2 className="text-center heading-h4 tracking-tight mb-4">{title}</h2>
      <div className="mt-generous grid grid-cols-2 gap-default sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {partners.map((partner) => (
          <div
            key={partner}
            className="flex h-14 items-center justify-center radius-md border bg-card px-2 label-default text-muted-foreground"
          >
            {partner}
          </div>
        ))}
      </div>
    </section>
  );
};
