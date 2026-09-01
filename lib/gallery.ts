/**
 * Photographs of Sehej Sharma, hosted on Wikimedia Commons.
 *
 * One list drives both the rendered gallery at /about-sehej-sharma and the
 * `image` array of the Person node on that page, so a photo can never appear
 * in the markup without its structured-data counterpart, or vice versa.
 *
 * `alt` is the accessible description and doubles as the ImageObject `name`;
 * `caption` is the visible figcaption. Commons `Special:FilePath` URLs are
 * used verbatim — they redirect to the current version of each file, so they
 * do not go stale when an image is re-uploaded.
 */
export type GalleryPhoto = {
  contentUrl: string;
  alt: string;
  caption: string;
};

export type GallerySection = {
  heading: string;
  photos: GalleryPhoto[];
};

export const sehejGallery: GallerySection[] = [
  {
    heading: "Speaking & Entrepreneurship",
    photos: [
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20Sharma.png",
        alt: "Sehej Sharma, Founder and CEO of Recharga Chargine, professional portrait",
        caption: "Sehej Sharma, Founder & CEO",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20pitching%20Recharga%20Chargine.jpg",
        alt: "Sehej Sharma pitching Recharga Chargine at a startup event",
        caption: "Pitching Recharga Chargine",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20pitching%20Recharga.jpg",
        alt: "Sehej Sharma presenting Recharga at a pitch event",
        caption: "Presenting Recharga",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20pitching.jpg",
        alt: "Sehej Sharma pitching to an audience",
        caption: "Pitching on stage",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20presenting%20awards%20at%20the%20Indian%20Institue%20of%20Technology%20Delhi.jpg",
        alt: "Sehej Sharma presenting at the Indian Institute of Technology (IIT) Delhi",
        caption: "At IIT Delhi",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20lecturing%20%40%20Indian%20Institute%20of%20Technology%20Delhi.jpg",
        alt: "Sehej Sharma lecturing at the Indian Institute of Technology (IIT) Delhi",
        caption: "Lecturing at IIT Delhi",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20lecturing%20at%20a%20business%20college.jpg",
        alt: "Sehej Sharma lecturing at a business college",
        caption: "Lecturing at a business college",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20speaking%20at%20a%20business%20school.jpg",
        alt: "Sehej Sharma speaking at a business school",
        caption: "Speaking at a business school",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20%40%20Master%27s%20Union%20for%20the%20CEO%20Challenger%202023.jpg",
        alt: "Sehej Sharma at Master's Union for the CEO Challenger 2023",
        caption: "Master's Union CEO Challenger 2023",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20Sharma%20addressing%20his%20team.jpg",
        alt: "Sehej Sharma addressing his team",
        caption: "Addressing his team",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20Sharma%20sitting%20for%20an%20interview.jpg",
        alt: "Sehej Sharma sitting for an interview",
        caption: "In an interview",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20addressing%20his%20school%20batch%20at%20high%20school%20graduation.jpg",
        alt: "Sehej Sharma addressing his batch at high school graduation",
        caption: "High school graduation address",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20being%20sehej.jpg",
        alt: "Sehej Sharma presenting in a boardroom",
        caption: "In the boardroom",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20working.jpg",
        alt: "Sehej Sharma working",
        caption: "At work",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20in%20his%20element.jpg",
        alt: "Sehej Sharma at work, in his element",
        caption: "In his element",
      },
    ],
  },
  {
    heading: "Equestrian & Personal",
    photos: [
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20playing%20Polo.png",
        alt: "Sehej Sharma playing polo on horseback",
        caption: "Playing polo",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20practicing%20polo.jpg",
        alt: "Sehej Sharma practicing polo",
        caption: "Practicing polo",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20dominating%20arena%20polo%20games.jpg",
        alt: "Sehej Sharma playing arena polo",
        caption: "Arena polo",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20Show%20jumping.jpg",
        alt: "Sehej Sharma show jumping on horseback",
        caption: "Show jumping",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20jumping%20horses%20early%20morning.png",
        alt: "Sehej Sharma show jumping early in the morning",
        caption: "Morning show jumping",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20performing%20dressage%20activities.jpg",
        alt: "Sehej Sharma performing dressage",
        caption: "Dressage",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20riding%20horses.jpg",
        alt: "Sehej Sharma riding horses",
        caption: "Horse riding",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20riding.jpg",
        alt: "Sehej Sharma horse riding",
        caption: "Riding",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20training%20a%20green%20horse.jpg",
        alt: "Sehej Sharma training a young horse",
        caption: "Training a green horse",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20with%20his%20friend%20Raghav%20playing%20golf.jpg",
        alt: "Sehej Sharma playing golf",
        caption: "Playing golf",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20in%20London.png",
        alt: "Sehej Sharma in London",
        caption: "In London",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20in%20Scotland.jpg",
        alt: "Sehej Sharma in Scotland",
        caption: "In Scotland",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20in%20Interlaken.jpg",
        alt: "Sehej Sharma in Interlaken",
        caption: "In Interlaken",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20in%20Gstaad.jpg",
        alt: "Sehej Sharma in Gstaad",
        caption: "In Gstaad",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20on%20holiday.jpg",
        alt: "Sehej Sharma on holiday",
        caption: "On holiday",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%27s%20work%20doesn%27t%20stop%20even%20while%20vacationing.jpg",
        alt: "Sehej Sharma working while on holiday",
        caption: "Working on holiday",
      },
      {
        contentUrl:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Sehej%20Sharma.jpg",
        alt: "Sehej Sharma",
        caption: "Sehej Sharma",
      },
    ],
  },
];

/** Every photo, in page order. */
export const sehejGalleryPhotos: GalleryPhoto[] = sehejGallery.flatMap((section) => section.photos);
