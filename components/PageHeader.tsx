export default function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-2xl leading-tight font-black tracking-tight text-stone-900 lg:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm font-medium text-stone-500">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
