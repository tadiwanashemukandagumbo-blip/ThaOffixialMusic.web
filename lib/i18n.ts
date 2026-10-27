export type Language = 'EN' | 'SN' | 'ND';

export interface TranslationDict {
  nav: {
    music: string;
    visuals: string;
    tour: string;
    bio: string;
    social: string;
    store: string;
    community: string;
    signIn: string;
    bookArtist: string;
    signOut: string;
    admin: string;
    fan: string;
  };
  hero: {
    kicker: string;
    tagline: string;
    realNameImprint: string;
    description: string;
    btnBio: string;
    btnStream: string;
    btnVisuals: string;
    featuredSingle: string;
    listen: string;
    location: string;
    management: string;
    verifiedArtist: string;
  };
  stats: {
    youtubeViews: string;
    youtubeViewsLabel: string;
    spotifyListeners: string;
    spotifyListenersLabel: string;
    youtubeHandle: string;
    youtubeHandleLabel: string;
    hometown: string;
    hometownLabel: string;
  };
  bio: {
    kicker: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    instagramFeedTitle: string;
    instagramFeedSub: string;
    exploreFeed: string;
    openApp: string;
    photo1Caption: string;
    photo2Caption: string;
    viewEpk: string;
    posterArchive: string;
    repTitle: string;
    repManagement: string;
    repImprint: string;
    industryRecognition: string;
    topRelease: string;
    catalogLabel: string;
  };
  music: {
    badge: string;
    title: string;
    subtitle: string;
    openSpotify: string;
    verifiedNotice: string;
    playerKicker: string;
    playerTitle: string;
    streamBtn: string;
    ft: string;
  };
  visuals: {
    badge: string;
    title: string;
    subtitle: string;
    openYoutube: string;
    guaranteeTitle: string;
    guaranteeBody: string;
    channelHub: string;
    activePlayerKicker: string;
    playInPlayer: string;
    openOnYt: string;
    verifiedUpload: string;
    watchDirectlyYt: string;
    subscribeTitle: string;
    subscribeSub: string;
    subscribeBtn: string;
  };
  tour: {
    kicker: string;
    title: string;
    subtitle: string;
    badge: string;
    comingSoon: string;
    notice: string;
    successMsg: string;
    emailPlaceholder: string;
    cityPlaceholder: string;
    notifyBtn: string;
  };
  store: {
    kicker: string;
    title: string;
    subtitle: string;
    badge: string;
    comingSoon: string;
    notice: string;
    successMsg: string;
    emailPlaceholder: string;
    joinWaitlist: string;
    hoodies: string;
    tees: string;
    vinyl: string;
  };
  community: {
    kicker: string;
    title: string;
    subtitle: string;
    communitySub: string;
    vipBadge: string;
    vipTitle: string;
    vipDescription: string;
    vipSuccess: string;
    checkboxPresale: string;
    btnJoinCircle: string;
    perk1: string;
    perk2: string;
    perk3: string;
    leaveMessage: string;
    namePlaceholder: string;
    locationPlaceholder: string;
    messagePlaceholder: string;
    postBtn: string;
  };
  booking: {
    kicker: string;
    title: string;
    subtitle: string;
    managementLabel: string;
    officialContacts: string;
    managementOffice: string;
    managementText: string;
    originLabel: string;
    responseWindow: string;
    emailDirectly: string;
    contractTitle: string;
    contractText: string;
    formTitle: string;
    categoryLabel: string;
    promoterLabel: string;
    promoterPlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    dateLabel: string;
    cityLabel: string;
    cityPlaceholder: string;
    budgetLabel: string;
    budgetPlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    sendBooking: string;
    inquiryReceived: string;
    inquirySuccess: string;
  };
  social: {
    followInsta: string;
    instaSub: string;
    openInsta: string;
    shareLink: string;
    copied: string;
  };
  footer: {
    bioShort: string;
    navigation: string;
    managementAndContact: string;
    allRightsReserved: string;
    navBio: string;
    navMusic: string;
    navVisuals: string;
    navTour: string;
    navSocial: string;
    navStore: string;
    navBooking: string;
  };
  auth: {
    fanPortal: string;
    welcomeHub: string;
    welcomeSub: string;
    signInTab: string;
    createFanTab: string;
    fullName: string;
    cityCountry: string;
    emailAddress: string;
    password: string;
    forgotPassword: string;
    signInBtn: string;
    createFanBtn: string;
    verifying: string;
    lockedBtn: string;
    continueGuest: string;
    officialPortal: string;
    welcomeBack: string;
    accountCreated: string;
    signedInMsg: string;
    securityAlertTitle: string;
    failedBadge: string;
    securityAlertBody: string;
    cooldownActive: string;
    cooldownNotice: string;
    cooldownFinished: string;
    resetPasswordNow: string;
    hideEmailDetails: string;
    viewDispatchedAlert: string;
    failedAttemptsWarning: string;
  };
  epk: {
    title: string;
    artistLabel: string;
    genreLabel: string;
    originLabel: string;
    repLabel: string;
    imprintLabel: string;
    catalogLabel: string;
    notice: string;
    closeBtn: string;
    requestFull: string;
  };
}

export const translations: Record<Language, TranslationDict> = {
  EN: {
    nav: {
      music: 'Music',
      visuals: 'Visuals',
      tour: 'Tour',
      bio: 'Bio',
      social: 'Social',
      store: 'Store',
      community: 'Community',
      signIn: 'Sign In',
      bookArtist: 'Book Artist',
      signOut: 'Sign Out',
      admin: 'Admin',
      fan: 'Fan',
    },
    hero: {
      kicker: 'Afrobeats • Rnb • Trap Artist From Africa',
      tagline: 'FROM AFRICA TO THE WORLD.',
      realNameImprint: 'Austin Mtomba · ThaOffixialMusic',
      description:
        'Pioneering the sound of modern African Afrobeats, emotive R&B, and atmospheric Trap. From Zvishavane and Harare to the international stage, experience hit singles "RUDO", "Emotional_Feeling", and "Wangu Moyo".',
      btnBio: 'Read Biography',
      btnStream: 'Stream "RUDO" on Spotify',
      btnVisuals: 'Watch Visuals',
      featuredSingle: 'Featured Single',
      listen: 'Listen',
      location: 'Zvishavane & Harare, Zimbabwe',
      management: 'Management: Mr Arts',
      verifiedArtist: 'Verified Spotify & Apple Music Artist',
    },
    stats: {
      youtubeViews: '1.3K+ Views',
      youtubeViewsLabel: 'Official YouTube Streams',
      spotifyListeners: '1 Monthly Listener',
      spotifyListenersLabel: 'Spotify Listeners',
      youtubeHandle: '@LilEthanThaOffixial',
      youtubeHandleLabel: 'Official YouTube Channel',
      hometown: 'Harare & Zvishavane',
      hometownLabel: 'Origin / Roots',
    },
    bio: {
      kicker: 'ARTIST BIOGRAPHY',
      title: 'The Story: Austin Mtomba',
      subtitle:
        'The musical journey of Austin Mtomba, fusing contemporary global trap and afro-rhythms with southern African soul.',
      p1: 'Austin Mtomba, known professionally as LilEthanThaOffixial, is an authentic Afrobeats, RnB, and Trap artist hailing from Zvishavane and Harare, Zimbabwe.',
      p2: 'Releasing under his flagship imprint ThaOffixialMusic, LilEthan has rapidly built an engaged audience across YouTube (@LilEthanThaOffixial), Spotify, Apple Music, and Audiomack with acclaimed drops including "RUDO" (produced by Loui27s / Law Keyz), "Hold You" (featuring Arcade X & Stunt Master), "Emotional Feeling", and "Wangu Moyo" (featuring Yvng B).',
      p3: 'Fusing emotive African songwriting with crisp trap rhythms, LilEthan chronicles loyalty, love, ambition, and youth reality in southern Africa. For professional bookings, synchronization, and features, contact artist management Mr Arts (thaoffixialmusic@gmail.com).',
      instagramFeedTitle: 'Official Instagram Feed',
      instagramFeedSub: 'Follow for pictures, studio updates & lifestyle drops',
      exploreFeed: 'Explore Live Feed',
      openApp: 'Open App',
      photo1Caption: 'Golden Hour · Zvishavane',
      photo2Caption: 'Downtime & Studio Break',
      viewEpk: 'View Electronic Press Kit (EPK)',
      posterArchive: 'Official Poster Archive',
      repTitle: 'Artist Representation',
      repManagement: 'Artist Management',
      repImprint: 'Music Imprint & Production',
      industryRecognition: 'Industry Recognition & Catalogs',
      topRelease: 'Top Spotify Release "RUDO" (ThaOffixialMusic)',
      catalogLabel: 'ThaOffixialMusic Catalog',
    },
    music: {
      badge: 'Official Discography • Sourced From Official Spotify & DSPs',
      title: 'Sound & Releases',
      subtitle:
        "Stream LilEthan's official discography directly on Spotify and verified global streaming platforms.",
      openSpotify: 'Open Official Spotify Profile',
      verifiedNotice: 'All Releases Sourced Directly From Verified Accounts:',
      playerKicker: 'Verified Spotify Discography Player',
      playerTitle: 'LilEthanThaOffixial (Austin Mtomba) on Spotify',
      streamBtn: 'Stream',
      ft: 'Ft.',
    },
    visuals: {
      badge: 'Verified Visual Vault • Channel: UCis0NzN0qBmTuFoXojUb8VQ',
      title: 'Official Music Videos',
      subtitle:
        "Stream verified music videos and visualizers directly from LilEthan's official YouTube page (@LilEthanThaOffixial).",
      openYoutube: 'Open @LilEthanThaOffixial on YouTube',
      guaranteeTitle: 'Strict Official Page Guarantee:',
      guaranteeBody:
        "All previewed videos are exclusively sourced from LilEthan's official YouTube channel (Channel ID: UCis0NzN0qBmTuFoXojUb8VQ). No third-party or unauthorized uploads.",
      channelHub: 'Channel Hub',
      activePlayerKicker: 'Active YouTube Video Player (Official Channel: UCis0NzN0qBmTuFoXojUb8VQ)',
      playInPlayer: 'Play in player above',
      openOnYt: 'Open on YouTube',
      verifiedUpload: 'Verified upload from channel: LilEthanThaOffixial',
      watchDirectlyYt: 'Watch directly on YouTube',
      subscribeTitle: 'Official Drops & Music Videos on YouTube',
      subscribeSub: 'Subscribe to @LilEthanThaOffixial for all official music video premieres and visualizers.',
      subscribeBtn: 'Subscribe to @LilEthanThaOffixial',
    },
    tour: {
      kicker: 'LIVE CONCERT ROUTING',
      title: 'Tour Dates & Appearances',
      subtitle: 'Live concert dates and festival appearances for LilEthanThaOffixial (Austin Mtomba).',
      badge: 'Routing in Progress',
      comingSoon: 'Coming Soon',
      notice:
        'Tour routing and headline show dates are currently in preparation. Be the first to know when tickets and VIP packages drop in your city.',
      successMsg: "✓ You're on the VIP presale list! Notifications will be sent prior to public announcement.",
      emailPlaceholder: 'Your Email',
      cityPlaceholder: 'Your City / Town',
      notifyBtn: 'Get Notified First',
    },
    store: {
      kicker: 'THAOFFIXIAL STORE',
      title: 'Merchandise & Apparel',
      subtitle: 'Exclusive archival apparel, streetwear silhouettes, and limited edition music merch drops.',
      badge: 'Archival Capsule 01',
      comingSoon: 'Coming Soon',
      notice:
        'The first official ThaOffixial apparel capsule is currently in production with custom oversized cuts and embroidered graphics. Sign up for early VIP access.',
      successMsg: "✓ You're registered on the Archival Capsule 01 waitlist! Secret link will arrive 24 hours before release.",
      emailPlaceholder: 'Enter your email for drop access',
      joinWaitlist: 'Join Waitlist',
      hoodies: 'Heavyweight French Terry Hoodies',
      tees: 'Vintage Tour Tees',
      vinyl: 'Collector Vinyl',
    },
    community: {
      kicker: 'COMMUNITY HUB • THE INNER CIRCLE',
      title: 'Join The Offixial Wave',
      subtitle: 'Get secret drop links 48 hours early, unreleased studio demos, and tour presale codes.',
      communitySub: 'Zvishavane, Harare & Diaspora',
      vipBadge: '✨ Free VIP Fan Tier',
      vipTitle: 'Never Miss A Drop',
      vipDescription:
        'Members receive direct SMS/email notifications for pop-up warehouse shows in Harare & Bulawayo, limited vinyl colorways, and private Discord listening parties with Austin Mtomba.',
      vipSuccess: "✓ Welcome to The Offixial Inner Circle! Your VIP ID has been issued.",
      checkboxPresale: 'Include tour presale notifications for Southern Africa',
      btnJoinCircle: 'Join The Inner Circle',
      perk1: '48-Hour Head Start on Merch & Tickets',
      perk2: 'High-Fidelity WAV Downloads of New Singles',
      perk3: 'Direct Fan Meetup Invitations',
      leaveMessage: '💬 Leave a Message for Austin',
      namePlaceholder: 'Your Name (e.g. Farai M.)',
      locationPlaceholder: 'City / Country (e.g. Harare)',
      messagePlaceholder: 'Your shoutout, favourite bar, or reaction...',
      postBtn: 'Post',
    },
    booking: {
      kicker: 'OFFICIAL BOOKING & REPRESENTATION DESK',
      title: 'Book LilEthanThaOffixial',
      subtitle: 'Professional bookings, festival appearances, feature collaborations, and media press inquiries.',
      managementLabel: 'Management:',
      officialContacts: 'Official Contacts',
      managementOffice: 'Management & Artist Office',
      managementText:
        'All live performance contracts, festival bookings, brand partnerships, and studio features are handled directly by management and artist team.',
      originLabel: 'Origin / Operations: Zvishavane & Harare, Zimbabwe',
      responseWindow: 'Response Window: 24 – 48 Business Hours',
      emailDirectly: 'Email Management Directly',
      contractTitle: 'Contract & Advance Booking',
      contractText:
        'Prompt booking proposals ensure date lock-in. Full sound system rider and accommodation specifications will be provided upon inquiry validation.',
      formTitle: 'Submit Booking Request',
      categoryLabel: 'Inquiry Category',
      promoterLabel: 'Promoter / Organization',
      promoterPlaceholder: 'e.g. Zimbabwe Sound Collective',
      contactLabel: 'Contact Person',
      contactPlaceholder: 'Full Name',
      emailLabel: 'Your Email Address',
      emailPlaceholder: 'promoter@domain.com',
      dateLabel: 'Proposed Show Date',
      cityLabel: 'City & Country',
      cityPlaceholder: 'e.g. Zvishavane / Harare',
      budgetLabel: 'Proposed Budget / Guarantee ($ USD)',
      budgetPlaceholder: 'e.g. $2,500 USD',
      notesLabel: 'Event Details & Notes',
      notesPlaceholder: 'Venue details, capacity, stage set length, and production setup...',
      sendBooking: 'Send Booking Request',
      inquiryReceived: 'Inquiry Received',
      inquirySuccess:
        'Thank you. Your proposal has been transmitted to Mr Arts (thaoffixialmusic@gmail.com). The representation office will contact you within 24 to 48 hours.',
    },
    social: {
      followInsta: 'Follow @lil_ethan_tha_official on Instagram',
      instaSub:
        "All media corresponds strictly to LilEthan's verified official accounts (@lil_ethan_tha_official). Tap to view live stories and reels on Instagram.",
      openInsta: 'Open Official Instagram',
      shareLink: 'Share Official Link',
      copied: 'Copied to Clipboard!',
    },
    footer: {
      bioShort:
        'Official web portal for ZimHipHop, soulful R&B, and contemporary trap recordings under ThaOffixialMusic.',
      navigation: 'Navigation',
      managementAndContact: 'Management & Contact',
      allRightsReserved: 'All rights reserved.',
      navBio: 'Biography & Updates',
      navMusic: 'Discography & Player',
      navVisuals: 'Visuals & YouTube',
      navTour: 'Tour Dates & Tickets',
      navSocial: 'Social & Instagram Feed',
      navStore: 'Merchandise Capsule',
      navBooking: 'Booking Desk',
    },
    auth: {
      fanPortal: 'THAOFFIXIAL FAN PORTAL',
      welcomeHub: 'WELCOME TO THE OFFICIAL HUB',
      welcomeSub: 'Join the ThaOffixial family for exclusive stream access, tour presales, and official updates.',
      signInTab: 'Sign In',
      createFanTab: 'Create Fan Account',
      fullName: 'Full Name',
      cityCountry: 'City & Country',
      emailAddress: 'Email Address',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      signInBtn: 'SIGN IN',
      createFanBtn: 'CREATE FAN ACCOUNT',
      verifying: 'VERIFYING...',
      lockedBtn: 'LOCKED',
      continueGuest: 'Continue exploring as guest (Sign in later)',
      officialPortal: 'Official Portal · ThaOffixialMusic',
      welcomeBack: 'Welcome Back!',
      accountCreated: 'Fan Account Created!',
      signedInMsg: 'You are now signed into the official LilEthanThaOffixial portal.',
      securityAlertTitle: 'SECURITY ALERT TRANSMITTED',
      failedBadge: '5/5 FAILED',
      securityAlertBody:
        '5 consecutive incorrect password attempts were detected. An urgent security alert has been dispatched via email to thaoffixialmusic@gmail.com and tadiwanashemukandagumbo@gmail.com with a secure password reset link.',
      cooldownActive: 'Cooldown Lock Active:',
      cooldownNotice:
        'Please wait 10 seconds before attempting to re-enter your password. You can also reset your password below.',
      cooldownFinished: 'Cooldown finished. You may re-enter your password now or reset it using the link.',
      resetPasswordNow: 'Reset Password Now',
      hideEmailDetails: 'Hide Email Details',
      viewDispatchedAlert: 'View Dispatched Alert',
      failedAttemptsWarning: 'Failed attempts: {n}/5 before 10s cooldown and security alert dispatch.',
    },
    epk: {
      title: 'Electronic Press Kit (EPK)',
      artistLabel: 'Artist:',
      genreLabel: 'Genre:',
      originLabel: 'Origin:',
      repLabel: 'Representation:',
      imprintLabel: 'Imprint:',
      catalogLabel: 'Official Verified Catalog',
      notice:
        'High-resolution press photographs, audio stems, stage technical rider, and hospitality rider available upon inquiry to artist management.',
      closeBtn: 'Close',
      requestFull: 'Request Full EPK Assets',
    },
  },

  SN: {
    nav: {
      music: 'Mimhanzi',
      visuals: 'Mavhidhiyo',
      tour: 'Konzati',
      bio: 'Nhoroondo',
      social: 'Masocial',
      store: 'Chitoro',
      community: 'Vateveri',
      signIn: 'Pinda',
      bookArtist: 'Buka Muimbi',
      signOut: 'Buda',
      admin: 'Mutungamiri',
      fan: 'Muteveri',
    },
    hero: {
      kicker: 'Muimbi weAfrobeats • Rnb • Trap Kubva muAfrica',
      tagline: 'KUBVA KUAFRICA KUENDAMU NYIKA YOSE.',
      realNameImprint: 'Austin Mtomba · ThaOffixialMusic',
      description:
        'Kutungamira mimhanzi mitsva yeAfrobeats, R&B inobata moyo, neTrap yekuAfrica. Kubva kuZvishavane neHarare kuenda kunyika dzese, teerera nziyo dzakakurumbira dzinoti "RUDO", "Emotional_Feeling", uye "Wangu Moyo".',
      btnBio: 'Verenga Nhoroondo',
      btnStream: 'Teerera "RUDO" paSpotify',
      btnVisuals: 'Ona Mavhidhiyo',
      featuredSingle: 'Rwiyo rweMazuva Ano',
      listen: 'Teerera',
      location: 'Zvishavane ne Harare, Zimbabwe',
      management: 'Vatariri: Mr Arts',
      verifiedArtist: 'Muimbi Wechokwadi paSpotify & Apple Music',
    },
    stats: {
      youtubeViews: 'Kudarika 1,300 Views',
      youtubeViewsLabel: 'Zviratidzwa zveYouTube Zvechokwadi',
      spotifyListeners: 'Muteereri 1 weMwedzi',
      spotifyListenersLabel: 'Vateereri paSpotify',
      youtubeHandle: '@LilEthanThaOffixial',
      youtubeHandleLabel: 'Chiteshi cheYouTube Chechokwadi',
      hometown: 'Harare & Zvishavane',
      hometownLabel: 'Kwazvakabva / Midzi',
    },
    bio: {
      kicker: 'NHOROONDO YAMUIMBI',
      title: 'Nhoroondo: Austin Mtomba',
      subtitle:
        'Rwendo rwemimhanzi rwaAustin Mtomba, rwakabatanidza trap yepasi rose, mimhanzi yechiAfrica pamwe nemweya wekuSouthern Africa.',
      p1: 'Austin Mtomba, anozivikanwa nezita rekuti LilEthanThaOffixial, muimbi weAfrobeats, RnB, neTrap anobva kuZvishavane neHarare, Zimbabwe.',
      p2: 'Achiburitsa pasi pekambani yake inonzi ThaOffixialMusic, LilEthan akura nekukurumidza achiteererwa paYouTube (@LilEthanThaOffixial), Spotify, Apple Music, neAudiomack nenziyo dzine mukurumbira dzinoti "RUDO" (yakagadzirwa naLoui27s / Law Keyz), "Hold You" (ina Arcade X & Stunt Master), "Emotional Feeling", uye "Wangu Moyo" (ina Yvng B).',
      p3: 'Kusanganisa mazwi erudo eAfrica pamwe nemitinhimira yeTrap, LilEthan anonyora nezvekuvimbika, rudo, zvishuvo, pamwe nehupenyu hwevechidiki muSouthern Africa. Kuti mubuke zviratidzo, nziyo mufirimu, nezvimwe, taurai nevatariri vemuimbi Mr Arts (thaoffixialmusic@gmail.com).',
      instagramFeedTitle: 'Mifananidzo yeInstagram Yechokwadi',
      instagramFeedSub: 'Teverai kuitira mifananidzo, nhau dzemustudio nehupenyu hwemazuva ese',
      exploreFeed: 'Ona Zviripo Ikozvino',
      openApp: 'Vhura App',
      photo1Caption: 'Kunyura kweZuva · Zvishavane',
      photo2Caption: 'Kuzorora muStudio',
      viewEpk: 'Ona Gwaro reMumhanzi (EPK)',
      posterArchive: 'Mifananidzo yeNhoroondo',
      repTitle: 'Vamiririri veMuimbi',
      repManagement: 'Vatariri veMuimbi',
      repImprint: 'Kambani neKugadzira Mimhanzi',
      industryRecognition: 'Mibairo neNhaka yeMimhanzi',
      topRelease: 'Rwiyo Rwepamusoro paSpotify "RUDO" (ThaOffixialMusic)',
      catalogLabel: 'Nhaka yeThaOffixialMusic',
    },
    music: {
      badge: 'Mimhanzi Yechokwadi • Kubva paSpotify neDSPs Dzechokwadi',
      title: 'Nziyo neZvitsva',
      subtitle:
        'Teererai mimhanzi yaLilEthan yechokwadi paSpotify nepamapuratifomu epasi rose.',
      openSpotify: 'Vhura Spotify yaLilEthan',
      verifiedNotice: 'Nziyo Dzose Dzinobva kuMaakaunzi Echokwadi:',
      playerKicker: 'Mutambi weMimhanzi yeSpotify Wechokwadi',
      playerTitle: 'LilEthanThaOffixial (Austin Mtomba) paSpotify',
      streamBtn: 'Teerera',
      ft: 'Ina',
    },
    visuals: {
      badge: 'Dura reMavhidhiyo Echokwadi • Chiteshi: UCis0NzN0qBmTuFoXojUb8VQ',
      title: 'Mavhidhiyo eMimhanzi Echokwadi',
      subtitle:
        'Onai mavhidhiyo echokwadi kubva paYouTube yaLilEthan (@LilEthanThaOffixial).',
      openYoutube: 'Vhura @LilEthanThaOffixial paYouTube',
      guaranteeTitle: 'Chivimbiso cheChiteshi Chechokwadi:',
      guaranteeBody:
        'Mavhidhiyo ose ari pano anobva pachete pachiteshi chaLilEthan cheYouTube (Channel ID: UCis0NzN0qBmTuFoXojUb8VQ). Hapana zvakabiwa kana kubva kune vamwe.',
      channelHub: 'Chiteshi cheYouTube',
      activePlayerKicker: 'Mutambi weVhidhiyo yeYouTube (Chiteshi: UCis0NzN0qBmTuFoXojUb8VQ)',
      playInPlayer: 'Ridza mumutambi ari pamusoro',
      openOnYt: 'Vhura paYouTube',
      verifiedUpload: 'Vhidhiyo yechokwadi kubva paLilEthanThaOffixial',
      watchDirectlyYt: 'Ona zvakananga paYouTube',
      subscribeTitle: 'Nziyo neMavhidhiyo Matsva paYouTube',
      subscribeSub: 'Nyorai tsamba pa@LilEthanThaOffixial kuitira mavhidhiyo ose matsva.',
      subscribeBtn: 'Nyorai pa@LilEthanThaOffixial',
    },
    tour: {
      kicker: 'MAZORORO NEMAKHONSATHI',
      title: 'Mazuva eKuratidza neMharidzo',
      subtitle: 'Mazuva emakonzati nemitambo yeLilEthanThaOffixial (Austin Mtomba).',
      badge: 'Kugadzirira Kuri Kuitika',
      comingSoon: 'Zviri Kuuya Nenguva Diki',
      notice:
        'Mazuva emakonzati nemitambo ari kugadzirwa. Iva wekutanga kuziva matikiti nemapaketi paanouya muguta renyu.',
      successMsg: '✓ Muri pachirongwa chekutanga chematikitikiti! Muchaziviswa vanhu vese vasati vaziva.',
      emailPlaceholder: 'Email Yenyu',
      cityPlaceholder: 'Guta Renyu / Musha',
      notifyBtn: 'Ziviswa Kutanga',
    },
    store: {
      kicker: 'CHITORO CHETHAOFFIXIAL',
      title: 'Zvipfeko neZvigadzirwa',
      subtitle: 'Zvipfeko zvakanakisa, hembe dzemutoo wezvino, nemachira eThaOffixial.',
      badge: 'Muunganidzwa weKutanga 01',
      comingSoon: 'Zviri Kuuya Nenguva Diki',
      notice:
        'Muunganidzwa wekutanga wezvipfeko zveThaOffixial uri kugadzirwa zvine unyanzvi hwekumusoro. Nyorai zita kuitira kuwana mukana wekutanga.',
      successMsg: '✓ Muri pachirongwa chekutsanangurwa kwezvipfeko! Link yemukati ichatumirwa maawa 24 zvisati zvatanga.',
      emailPlaceholder: 'Isa email yako kuitira zvipfeko',
      joinWaitlist: 'Pinda paChirongwa',
      hoodies: 'MaHodi Akasimba eFrench Terry',
      tees: 'T-Shirt dzeKonzati',
      vinyl: 'Vinyl yeVatereri',
    },
    community: {
      kicker: 'NZVIMBO YEVATEVERI • BOTSWERE',
      title: 'Pinda muMafungu eThaOffixial',
      subtitle: 'Wana ma-link asati abuda pamberi pemaawa 48, nziyo dzechivande, nemakodhi ematikiti.',
      communitySub: 'Zvishavane, Harare neVose Vari Kune Dzimwe Nyika',
      vipBadge: '✨ Nhengo Yechiremera Yemahara',
      vipTitle: 'Usashaikwe neRwiyo Rutsva',
      vipDescription:
        'Nhengo dzinowana mameseji ne-email nezvekuratidza muHarare & Bulawayo, mavhiniri anokosha, pamwe nekuteerera naAustin Mtomba paDiscord.',
      vipSuccess: '✓ Titambire muBotswere hweThaOffixial! Kadhi renyu reVIP raburitswa.',
      checkboxPresale: 'Sanganisira ziviso dzematikiti eSouthern Africa',
      btnJoinCircle: 'Pinda muBotswere',
      perk1: 'Maawa 48 Pamberi peZvipfeko neMatikiti',
      perk2: 'Kutorwa kweNziyo muHunhu Hwepamusoro (WAV)',
      perk3: 'Kukokwa kuMusangano weMuimbi neVateveri',
      leaveMessage: '💬 Siira Austin Mashoko',
      namePlaceholder: 'Zita Renyu (senge Farai M.)',
      locationPlaceholder: 'Guta / Nyika (senge Harare)',
      messagePlaceholder: 'Mashoko enyu, vhesi yamunoda, kana pfungwa...',
      postBtn: 'Tumira',
    },
    booking: {
      kicker: 'OFISI YEKUBUKA NEKUMIRIRIRA MUIMBI',
      title: 'Buka LilEthanThaOffixial',
      subtitle: 'Kukumbira muimbi kuMitambo, maKonzati, Nziyo dzekubatana pamwe nenhau dzenhepfenyuro.',
      managementLabel: 'Vatariri:',
      officialContacts: 'Mabatiro Echokwadi',
      managementOffice: 'Vatariri neOfisi yaMuimbi',
      managementText:
        'Zvose zvine chekuita nekubuka muimbi, mitambo, kudyidzana nemakambani, nekubatana mumuimbi zvinotongwa nevatariri vemuimbi.',
      originLabel: 'Nzvimbo yeMabasa: Zvishavane & Harare, Zimbabwe',
      responseWindow: 'Nguva yekupindura: Maawa 24 kusvika 48 eBasa',
      emailDirectly: 'Nyorera Vatariri Tsamba',
      contractTitle: 'Kunyora Chibvumirano neKubuka Pamberi',
      contractText:
        'Kukumbira pamberi kunovimbisa kubata zuva. Zvose zvinodiwa paruzha rwemimhanzi nepekugara zvichapiwa kana chikumbiro chatenderwa.',
      formTitle: 'Tumira Chikumbiro cheKubuka',
      categoryLabel: 'Mhando yeChikumbiro',
      promoterLabel: 'Murongi / Sangano',
      promoterPlaceholder: 'senge Zimbabwe Sound Collective',
      contactLabel: 'Munhu weKubata Naye',
      contactPlaceholder: 'Zita Rizere',
      emailLabel: 'Email Yenyu',
      emailPlaceholder: 'promoter@domain.com',
      dateLabel: 'Zuva reMutambo',
      cityLabel: 'Guta & Nyika',
      cityPlaceholder: 'senge Zvishavane / Harare',
      budgetLabel: 'Mari Yakarongwa ($ USD)',
      budgetPlaceholder: 'senge $2,500 USD',
      notesLabel: 'Tsananguro yeMutambo',
      notesPlaceholder: 'Nzvimbo yemutambo, huwandu hwevanhu, nguva yekutsika stage...',
      sendBooking: 'Tumira Chikumbiro cheKubuka',
      inquiryReceived: 'Chikumbiro Chasvika',
      inquirySuccess:
        'Maita basa. Chikumbiro chenyu chatumirwa kuna Mr Arts (thaoffixialmusic@gmail.com). Hofisi ichataura nemi mukati memaawa 24 kusvika 48.',
    },
    social: {
      followInsta: 'Teverai @lil_ethan_tha_official paInstagram',
      instaSub:
        'Mifananidzo yose ndeyechokwadi inobva kune akaunzi yaLilEthan yechokwadi (@lil_ethan_tha_official). Shandisai bhatani iri kuona nyaya paInstagram.',
      openInsta: 'Vhura Instagram Yechokwadi',
      shareLink: 'Govera Link Yechokwadi',
      copied: 'Zvakopwa!',
    },
    footer: {
      bioShort:
        'Dandaro reZimHipHop, R&B inobata moyo, pamwe neTrap pasi peThaOffixialMusic.',
      navigation: 'Kutungamira',
      managementAndContact: 'Vatariri neKubata Nesu',
      allRightsReserved: 'Kodzero dzose dzakachengetedzwa.',
      navBio: 'Nhoroondo neNhau',
      navMusic: 'Mimhanzi neMutambi',
      navVisuals: 'Mavhidhiyo neYouTube',
      navTour: 'Mazuva eMutambo neMatikiti',
      navSocial: 'Masocial neInstagram',
      navStore: 'Zvipfeko neZvigadzirwa',
      navBooking: 'Dhesiki reKubuka',
    },
    auth: {
      fanPortal: 'NZVIMBO YEVATEVERI VETHAOFFIXIAL',
      welcomeHub: 'TITAMBIRE MUHUB YE CHOKWADI',
      welcomeSub: 'Pindai mumhuri yeThaOffixial kuitira nziyo dzechivande, matikiti ekonzati, nenhau dzechokwadi.',
      signInTab: 'Pinda',
      createFanTab: 'Gadzira Akaunzi yeMuteveri',
      fullName: 'Zita Rizere',
      cityCountry: 'Guta & Nyika',
      emailAddress: 'Kero yeEmail',
      password: 'Pasiwedi',
      forgotPassword: 'Mawakanganwa pasiwedi?',
      signInBtn: 'PINDA',
      createFanBtn: 'GADZIRA AKAUNZI YEMUTEVERI',
      verifying: 'ZVIRI KUONGORORWA...',
      lockedBtn: 'ZVAKAKIIWA',
      continueGuest: 'Enderera mberi semuenzi (Pinda gare gare)',
      officialPortal: 'Dandaro reChokwadi · ThaOffixialMusic',
      welcomeBack: 'Mauya Zvekare!',
      accountCreated: 'Akaunzi yeMuteveri Yagadzirwa!',
      signedInMsg: 'Iye zvino mapinda mudandaro reLilEthanThaOffixial rechokwadi.',
      securityAlertTitle: 'YAMBIRO YEKUCHENGETEDZA YATUMIRWA',
      failedBadge: '5/5 ZVAKANGANISWA',
      securityAlertBody:
        'Kukanganisa pasiwedi ka5 kwatevedzana kwaonekwa. Yambiro yekukurumidza yatumirwa kune thaoffixialmusic@gmail.com ne tadiwanashemukandagumbo@gmail.com ine link yekuchinja pasiwedi.',
      cooldownActive: 'Nguva Yekumirira (Cooldown):',
      cooldownNotice:
        'Mirai masekonzi gumi musati maedza kupinda zvekare. Munogona kuchinja pasiwedi pazasi.',
      cooldownFinished: 'Nguva yekumirira yapera. Munogona kuisa pasiwedi patsva kana kuichinja.',
      resetPasswordNow: 'Chinja Pasiwedi Iye Zvino',
      hideEmailDetails: 'Vanza Tsamba',
      viewDispatchedAlert: 'Ona Tsamba Yatumirwa',
      failedAttemptsWarning: 'Kukanganisa: {n}/5 nguva yekumirira ye10s neyambiro isati yatumirwa.',
    },
    epk: {
      title: 'Gwaro reMumhanzi (EPK)',
      artistLabel: 'Muimbi:',
      genreLabel: 'Mhando yemimhanzi:',
      originLabel: 'Kwazvakabva:',
      repLabel: 'Vamiririri:',
      imprintLabel: 'Kambani:',
      catalogLabel: 'Nziyo Dzechokwadi',
      notice:
        'Mifananidzo yemhando yepamusoro, nziyo, zvinodiwa pastage nezvimwe zviripo mukabvunza vatariri vemuimbi.',
      closeBtn: 'Vhara',
      requestFull: 'Kumbira Gwaro Rizere reEPK',
    },
  },

  ND: {
    nav: {
      music: 'Umculo',
      visuals: 'Amavidiyo',
      tour: 'Amakhonsathi',
      bio: 'Imbali',
      social: 'Ezokuxhumana',
      store: 'Isitolo',
      community: 'Abasekeli',
      signIn: 'Ngena',
      bookArtist: 'Bhukha Umculi',
      signOut: 'Phuma',
      admin: 'Umlawuli',
      fan: 'Umlandeli',
    },
    hero: {
      kicker: 'Umculi we-Afrobeats • Rnb • Trap Ovela e-Afrika',
      tagline: 'KUSUKELA E-AFRIKA KUSIYA EMHLABENI JIKELELE.',
      realNameImprint: 'Austin Mtomba · ThaOffixialMusic',
      description:
        'Ukukhokhela umculo omutsha we-Afrobeats yase-Afrika, i-R&B ethinta inhliziyo, le-Trap. Kusukela eZvishavane leHarare kusiya emhlabeni jikelele, thola izingoma ezidumileyo ezithi "RUDO", "Emotional_Feeling", kanye le "Wangu Moyo".',
      btnBio: 'Bala Imbali',
      btnStream: 'Lalela "RUDO" ku-Spotify',
      btnVisuals: 'Bukela Amavidiyo',
      featuredSingle: 'Ingoma Ekhonjiswayo',
      listen: 'Lalela',
      location: 'EZvishavane leHarare, eZimbabwe',
      management: 'Abaphathi: Mr Arts',
      verifiedArtist: 'Umculi Oqinisekiswe ku-Spotify le-Apple Music',
    },
    stats: {
      youtubeViews: 'Kudlula 1,300 Views',
      youtubeViewsLabel: 'Ukubukwa ku-YouTube Okusemthethweni',
      spotifyListeners: 'Umlaleli 1 Ngenyanga',
      spotifyListenersLabel: 'Abalaleli ku-Spotify',
      youtubeHandle: '@LilEthanThaOffixial',
      youtubeHandleLabel: 'Isiteshi se-YouTube Esemthethweni',
      hometown: 'EHarare leZvishavane',
      hometownLabel: 'Imvelaphi / Izimpande',
    },
    bio: {
      kicker: 'IMBALI YOMCULI',
      title: 'Indaba: Austin Mtomba',
      subtitle:
        'Uhambo lomculo luka-Austin Mtomba, oluhlanganisa i-trap yomhlaba jikelele, imiculo yase-Afrika kanye lomoya oseNingizimu ye-Afrika.',
      p1: 'U-Austin Mtomba, owaziwa ngelithi LilEthanThaOffixial, ngumculi we-Afrobeats, RnB, le-Trap odabuka eZvishavane leHarare, eZimbabwe.',
      p2: 'Ekhipha phansi kwenkampani yakhe i-ThaOffixialMusic, u-LilEthan usezakhele abalandeli abanengi ku-YouTube (@LilEthanThaOffixial), Spotify, Apple Music, kanye le-Audiomack ngezingoma ezincomekayo ezihlanganisa "RUDO" (eyakhiwe ngu-Loui27s / Law Keyz), "Hold You" (elo-Arcade X lo-Stunt Master), "Emotional Feeling", kanye le "Wangu Moyo" (elo-Yvng B).',
      p3: 'Ehlanganisa ukubhala izingoma ezithinta inhliziyo zemvelo yase-Afrika lezigqi ze-Trap, u-LilEthan ukhuluma ngokuthembeka, uthando, amaphupho, lempilo yabatsha eNingizimu ye-Afrika. Ngezicelo zokubuka, izingoma, lezindaba, xhumana lomphathi womculi u-Mr Arts (thaoffixialmusic@gmail.com).',
      instagramFeedTitle: 'Ukusakazwa kwe-Instagram Okusemthethweni',
      instagramFeedSub: 'Landela ukuze ubone izithombe, indaba zestudiyo lempilo yansuku zonke',
      exploreFeed: 'Hlola Okwenzakalayo Manje',
      openApp: 'Vula i-App',
      photo1Caption: 'Ukutshona Kwelanga · eZvishavane',
      photo2Caption: 'Ukuphumula e-Studiyo',
      viewEpk: 'Buka Ibhuku Lomculi (EPK)',
      posterArchive: 'Indawo Yezithombe Zomlando',
      repTitle: 'Abameli Bomculi',
      repManagement: 'Abaphathi Bomculi',
      repImprint: 'Inkampani Yokucula Lokukhiqiza',
      industryRecognition: 'Ukuhlonishwa Komculo Lamakhathalogi',
      topRelease: 'Ingoma Ephezulu ku-Spotify "RUDO" (ThaOffixialMusic)',
      catalogLabel: 'Ikhathalogi ye-ThaOffixialMusic',
    },
    music: {
      badge: 'Umculo Osemthethweni • Ovela ku-Spotify le-DSPs Ezisemthethweni',
      title: 'Umculo Lokukhishiweyo',
      subtitle:
        'Lalela umculo ka-LilEthan osemthethweni ku-Spotify lakuzo zonke izinkundla zomhlaba.',
      openSpotify: 'Vula Iphrofayili ye-Spotify',
      verifiedNotice: 'Zonke Izingoma Zitholakala Emakhasini Aqondileyo:',
      playerKicker: 'Umdlali Womculo we-Spotify Oqinisekisiweyo',
      playerTitle: 'LilEthanThaOffixial (Austin Mtomba) ku-Spotify',
      streamBtn: 'Lalela',
      ft: 'Elo',
    },
    visuals: {
      badge: 'Indawo Yamavidiyo Asemthethweni • Isiteshi: UCis0NzN0qBmTuFoXojUb8VQ',
      title: 'Amavidiyo Omculo Asemthethweni',
      subtitle:
        'Bukela amavidiyo aqinisekisiweyo avela ekhasini lika-LilEthan le-YouTube (@LilEthanThaOffixial).',
      openYoutube: 'Vula @LilEthanThaOffixial ku-YouTube',
      guaranteeTitle: 'Isiqiniseko Esipheleleyo Sesiteshi Esisemthethweni:',
      guaranteeBody:
        'Wonke amavidiyo akhonjiswe lapha avela ngqo esiteshini sika-LilEthan se-YouTube (Channel ID: UCis0NzN0qBmTuFoXojUb8VQ). Akula okomgunyathi kumbe okungavunyelwanga.',
      channelHub: 'Isizinda Sesiteshi',
      activePlayerKicker: 'Umdlali Wevidiyo ye-YouTube (Isiteshi: UCis0NzN0qBmTuFoXojUb8VQ)',
      playInPlayer: 'Dlalela kumphezulu',
      openOnYt: 'Vula ku-YouTube',
      verifiedUpload: 'Ividiyo eqinisekisiweyo evela ku-LilEthanThaOffixial',
      watchDirectlyYt: 'Bukela ngqo ku-YouTube',
      subscribeTitle: 'Izingoma Lamavidiyo Amatsha ku-YouTube',
      subscribeSub: 'Bhalisa ku-@LilEthanThaOffixial ukuze ubone amavidiyo amatsha wonke.',
      subscribeBtn: 'Bhalisa ku-@LilEthanThaOffixial',
    },
    tour: {
      kicker: 'UHLELO LWAMAKHONSATHI',
      title: 'Izinsuku Zekhonsathi Lemibukiso',
      subtitle: 'Izinsuku zekhonsathi lomkhosi zika-LilEthanThaOffixial (Austin Mtomba).',
      badge: 'Uhlelo Lusamiswa',
      comingSoon: 'Kuyeza Maduze',
      notice:
        'Izinsuku zekhonsathi lemicimbi zisakhona ekulungisweni. Yiba ngowokuqala ukwazi nxa amathikithi eqala ukuthengiswa edolobheni lakho.',
      successMsg: '✓ Ususehlwini lwabazothola amathikithi kuqala! Uzathunyelelwa umlayezo wonke umuntu engakaziswa.',
      emailPlaceholder: 'I-imeyili Yakho',
      cityPlaceholder: 'Idolobha Lakho',
      notifyBtn: 'Yiba Ngowokuqala Ukwaziswa',
    },
    store: {
      kicker: 'ISITOLO SE-THAOFFIXIAL',
      title: 'Impahla Lokuthengiswayo',
      subtitle: 'Impahla eyingqayizivele, izigqoko zesimanjemanje, lempahla yomculo ekhethekileyo.',
      badge: 'Iqoqo Lokuqala 01',
      comingSoon: 'Kuyeza Maduze',
      notice:
        'Iqoqo lokuqala lempahla ye-ThaOffixial liyathungwa okwamanje ngobunyoninco obukhulu. Bhalisa ukuze uthole ithuba lokuqala.',
      successMsg: '✓ Ubhalisile ohlwini lweqoqo lokuqala! I-link izafika amahora angama-24 ingakaphumi.',
      emailPlaceholder: 'Faka i-imeyili yakho ukuze uthole impahla',
      joinWaitlist: 'Ngena Ohlwini',
      hoodies: 'Ama-Hoodie Aqineyo e-French Terry',
      tees: 'Ama-T-Shirt Ekhonsathi',
      vinyl: 'I-Vinyl Yabaqoqi',
    },
    community: {
      kicker: 'ISIZINDA SABASEKELI • UMHOBOLO',
      title: 'Zihlanganise Le-ThaOffixial',
      subtitle: 'Thola ama-link ezingoma ezintsha kusasele amahora angama-48, umculo ongakaphumi, lamakhodi amathikithi.',
      communitySub: 'EZvishavane, eHarare Lakwamanye Amazwe',
      vipBadge: '✨ Ubulungu Be-VIP Bamahhala',
      vipTitle: 'Ungaphuthelwa Yilutho',
      vipDescription:
        'Amalunga athola imilayezo nge-SMS le-imeyili ngemibukiso e-Harare le-Bulawayo, izingoma eziyigugu, kanye lokulalela lo-Austin Mtomba ku-Discord.',
      vipSuccess: '✓ Sikwemukele ku-ThaOffixial Inner Circle! Ikhadi lakho le-VIP seliqediwe.',
      checkboxPresale: 'Faka lezaziso zamathikithi eNingizimu ye-Afrika',
      btnJoinCircle: 'Joyina Umhobolo',
      perk1: 'Amahora angama-48 Ngaphambi Kokuthengiswa Kwempahla Lamathikithi',
      perk2: 'Ukuthola Izingoma Zisezingeni Eliphezulu (WAV)',
      perk3: 'Izimemo Zokuhlangana Lomculi',
      leaveMessage: '💬 Bhalela u-Austin Umlayezo',
      namePlaceholder: 'Ibizo Lakho (isib. Sipho N.)',
      locationPlaceholder: 'Idolobha / Ilizwe (isib. Bulawayo)',
      messagePlaceholder: 'Umlayezo wakho, amagama owathandayo, kumbe imicabango...',
      postBtn: 'Thumela',
    },
    booking: {
      kicker: 'IHOFISI LOKUBHUKHA LOKUMELA UMCULI',
      title: 'Bhukha u-LilEthanThaOffixial',
      subtitle: 'Ukubhukha amakhonsathi, imikhosi yomculo, ukuhlanganyela ezingomeni, lezindaba zokusakaza.',
      managementLabel: 'Abaphathi:',
      officialContacts: 'Imininingwane Yeqiniso',
      managementOffice: 'Abaphathi Lehofisi Yomculi',
      managementText:
        'Zonke izivumelwano zokucula, ukubhukha imikhosi, ukusebenzisana lamabhizimusi, lokucula ndawonye kusingathwa ngabaphathi bomculi.',
      originLabel: 'Indawo Yokusebenzela: eZvishavane leHarare, eZimbabwe',
      responseWindow: 'Isikhathi Sokuphendula: Amahora angama-24 kuya kwangama-48',
      emailDirectly: 'Thumelela Abaphathi I-imeyili Ngqo',
      contractTitle: 'Izivumelwano Lokubhukha Kuselithuba',
      contractText:
        'Ukubhukha kuselithuba kuqinisekisa ukuthola ilanga. Zonke izidingo zomsindo lendawo yokuhlala zizanikwa nxa isicelo sesivunyelwe.',
      formTitle: 'Thumela Isicelo Sokubhukha',
      categoryLabel: 'Uhlobo Lwesicelo',
      promoterLabel: 'Umhleli / Inhlanganiso',
      promoterPlaceholder: 'isib. Zimbabwe Sound Collective',
      contactLabel: 'Umuntu Wokuxhumana Laye',
      contactPlaceholder: 'Ibizo Elipheleleyo',
      emailLabel: 'I-imeyili Yakho',
      emailPlaceholder: 'promoter@domain.com',
      dateLabel: 'Ilanga Lomcimbi Eliphakanyisiweyo',
      cityLabel: 'Idolobha Lelizwe',
      cityPlaceholder: 'isib. eZvishavane / eHarare',
      budgetLabel: 'Imadlana Ebekiweyo ($ USD)',
      budgetPlaceholder: 'isib. $2,500 USD',
      notesLabel: 'Incazelo Yomcimbi',
      notesPlaceholder: 'Indawo yomcimbi, inani labantu, ubude besikhathi sokucula...',
      sendBooking: 'Thumela Isicelo Sokubhukha',
      inquiryReceived: 'Isicelo Samukelwe',
      inquirySuccess:
        'Siyabonga. Isicelo sakho sithunyelwe ku-Mr Arts (thaoffixialmusic@gmail.com). Ihofisi izaxhumana lawe phakathi kwamahora angama-24 kuya kwangama-48.',
    },
    social: {
      followInsta: 'Landela @lil_ethan_tha_official ku-Instagram',
      instaSub:
        'Konke okukhonjiswayo kuvela ekhasini lika-LilEthan eliqinisekisiweyo (@lil_ethan_tha_official). Cindezela ukuze ubone izindaba lamavidiyo ku-Instagram.',
      openInsta: 'Vula i-Instagram Esemthethweni',
      shareLink: 'Yabelana Nge-Link Esemthethweni',
      copied: 'Kukotshiwe!',
    },
    footer: {
      bioShort:
        'Isizinda esisemthethweni se-ZimHipHop, i-R&B ethinta inhliziyo, le-Trap phansi kwe-ThaOffixialMusic.',
      navigation: 'Ukuhamba',
      managementAndContact: 'Abaphathi Lokuxhumana',
      allRightsReserved: 'Wonke amalungelo agodliwe.',
      navBio: 'Imbali Lezindaba',
      navMusic: 'Umculo Lomdlali',
      navVisuals: 'Amavidiyo le-YouTube',
      navTour: 'Izinsuku Zekhonsathi Lamathikithi',
      navSocial: 'Ezokuxhumana le-Instagram',
      navStore: 'Impahla Yomculo',
      navBooking: 'Ideski Lokubhukha',
    },
    auth: {
      fanPortal: 'ISIZINDA SABASEKELI BE-THAOFFIXIAL',
      welcomeHub: 'SIKWEMUKELA ESIZINDENI ESISEMTHETHWENI',
      welcomeSub: 'Joyina imuli ye-ThaOffixial ukuze uthole umculo wokukhetheka, amathikithi ekhonsathi, lezindaba ezisemthethweni.',
      signInTab: 'Ngena',
      createFanTab: 'Vula I-akhawunti Yomlandeli',
      fullName: 'Ibizo Elipheleleyo',
      cityCountry: 'Idolobha Lelizwe',
      emailAddress: 'I-imeyili',
      password: 'Iphasiwedi',
      forgotPassword: 'Ukhohlwe iphasiwedi?',
      signInBtn: 'NGENA',
      createFanBtn: 'VULA I-AKHAWUNTI YOMLANDELI',
      verifying: 'KUYAHLOLWA...',
      lockedBtn: 'KUVALIWE',
      continueGuest: 'Qhubeka njengesivakashi (Ngena ngemva kwesikhathi)',
      officialPortal: 'Isizinda Esemthethweni · ThaOffixialMusic',
      welcomeBack: 'Wemukelekile Futhi!',
      accountCreated: 'I-akhawunti Yomlandeli Isivuliwe!',
      signedInMsg: 'Manje usungene esizindeni esisemthethweni sika-LilEthanThaOffixial.',
      securityAlertTitle: 'ISIXWAYISO SOKUVIKELA SITHUNYELWE',
      failedBadge: '5/5 KWEHLULEKILE',
      securityAlertBody:
        'Ukufaka iphasiwedi engayiyo kahlanu ngokulandelana kutholakele. Isixwayiso sithunyelwe nge-imeyili ku-thaoffixialmusic@gmail.com kanye le-tadiwanashemukandagumbo@gmail.com elo-link yokutshintsha iphasiwedi.',
      cooldownActive: 'Isikhathi Sokuphumula (Cooldown):',
      cooldownNotice:
        'Sicela ume imizuzwana elitshumi ungakaphindi ufake iphasiwedi. Ungatshintsha iphasiwedi yakho ngenzansi.',
      cooldownFinished: 'Isikhathi sokuphumula sesiphelile. Ungafaka iphasiwedi yakho futhi kumbe uyitshintshe.',
      resetPasswordNow: 'Tshintsha Iphasiwedi Manje',
      hideEmailDetails: 'Fihla I-imeyili',
      viewDispatchedAlert: 'Buka I-imeyili Ethunyelweyo',
      failedAttemptsWarning: 'Ukwehluleka: {n}/5 ngaphambi kokumiswa okwemizuzwana eyi-10.',
    },
    epk: {
      title: 'Ibhuku Lomculi (EPK)',
      artistLabel: 'Umculi:',
      genreLabel: 'Uhlobo lomculo:',
      originLabel: 'Imvelaphi:',
      repLabel: 'Abameli:',
      imprintLabel: 'Inkampani:',
      catalogLabel: 'Izingoma Ezisemthethweni',
      notice:
        'Izithombe ezinhle kakhulu, izingoma, izidingo zasesiteji lezinye izinto ziyatholakala nxa ubuzisisa kubaphathi bomculi.',
      closeBtn: 'Vala',
      requestFull: 'Cela Konke Okuphathelane le-EPK',
    },
  },
};
