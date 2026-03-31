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
    <section className="container mx-auto px-4 py-14">
      <h2 className="text-center text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {partners.map((partner) => (
          <div
            key={partner}
            className="flex h-14 items-center justify-center rounded-lg border bg-card px-2 text-sm font-semibold text-muted-foreground"
          >
            {partner}
          </div>
        ))}
      </div>
    </section>
  );
};
