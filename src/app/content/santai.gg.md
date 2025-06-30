
Santai.gg is an open-source project hosted by [limit](https://limitedio.com/) and [haft](https://www.kadirlofca.com/), which acts as a tracker service for the game 'Spectre Divide'.
Although Spectre Divide was officially shut down in April 2025, the site remains live (as of writing) and continues to display player statistics and leaderboards.

---

### Core Technologies

 - TypeScript - Provides strong static typing, improved IDEA support, and better developer confidence. Used across teh codebase to catch bugs early and enable safer refactoring.
 - Next.js & React - Next.js serves as the full-stack React framework powering the site, offering features like file-based routing, dynamic rendering, and optimized performance. React enables a modular, component-driven architecture that scales well with project complexity.
 - TailwindCSS - Used as the utility-first styling framework to ensure consistency, responsiveness, and rapid development. Custom design tokans and variants were used for maintainability and theming flexibility.

---

### Contributions

I contributed significantly to the second version of the Santai.gg website, which launched alongside Spectre Divide's Season 1 launch. I was responsible for developing a large amount of the site's frontend and helped maintain it until Mountaintop Studios announced the game's sunsetting.
While I collaborated on various parts of the site, I want to note that I didn't design every section. My design efforts were focused primarily on the Player Profile pages and Global Leadboard - areas where I led both the design and implementation. I assisted with design decisions elsewhere, but was not the sole designer for the full platform. I mention this to differentiate my work, as not all visual elements across the site reflect my standards or design direction.

---

### Player profiles

The player profile pages were built to showcase a wide range of personal in-game statistics, tailored to fit the visual identity of Spectre Divide. The design followed a theme consistent with the game's UI, drawing inspiration from cyberpunk motifs but with a more restrained and cleaner application.

To maintain clarity and visual structure, stats were broken into sections such as Rank, Sponsors, Maps, Seasonal Stats, and Matches. Each section was housed in a container that used layered "extrusions", a visual styling cue found in Spectre Divide's UI. Smaller details, such as a clipped corner on each profile picture, reinforced the site's stylistic alignment with the game.

Color was also carefully considered. A color scheme carefully selected by [haft](https://www.kadirlofca.com/) used Spectre Divide's Season 1 flagship colors, primarily a lime green contrasted against a dark blue-gray background, to direct attention to key information. For example, important text elements like map or sponsor names were highlighted in lime green, creating a clean visual break between segments of data. 

![Santai.gg Player Profile](/projects/santai/playerprofile.png)

#### Match History

Match history was another focal point of player profiles. Each tracked match was displayed as a card showing basic results, which could be expanded to reveal more detailed statistics for all players involved in that individual match. 

To maximize clarity within tight layout constraints:
 - The player who's profile was currentely being view was highlighted with a subtle gold-faded background.
 - Each player's ADR (Average Damage per Round) score was color-coded - high performance in a vibrant green, average in gray, and underperformance in red.

![Santai.gg Player Match Stats](/projects/santai/playermatchstats.png)

The image above demonstrates this well. This match was viewed on 'makar_wi's profile, hence their row was highlighted with a gold-faded background. The color coding of the ADR is also well demonstrated here, with players ranging from a variety of different scores. 

#### Timeout Bug

A common issue users encountered when opening their player profiles on Santai.gg was the page loading indefinitely. After invesitgating, I traced the cause to a timeout error in the API request responsible for fetching player data. This issue was particularly triggered when a user had a large number of tracked matches, which made the request too heavy and prone to timing out. To address this, I implemented two main solutions: 

 - Only the 20 most recent matches are loaded by default. Players can then load 20 more at a time using a "Load More" button. This significantly reduced response times and improved initial page load performance. 
 - I added a retry mechanism that attempts the API call up to three times, with increasing delays between each attempt. If all retries fail, the page is refreshing to give the API another chance to response. 

This solution fully eliminated the issue, even for extremely large profiles, and it has greatlyu improved the experience for users by prevent indefinte loading and reducing the load time of profiles.

#### Backend Limitations

One of the key technical challenges in building Santai.gg was the lack of an official API provided by Mountaintop Studios. Instead, data collection relied on a closed-srouce API developed by [limit](https://limitedio.com/), with informal support from Mountaintop developers. This API accessed backend servers directly, but operated under strict usage limits to avoid placing excessive load on the game's infrastructure. 

Because of these limitations, data on Santai.gg was not updated in real time, and certain features were restricted. The Match History system, in particular, was affected. Matches were only automatically tracked if they involved a full 3-stack team (i.e., three players queuing together as a party). Any other matches had to be manually submitted by users entering the match ID on the site, which would place the match in a processing queue for inclusion into Santai.gg's match database.

While this workaround allowed for more flexible tracking, the match queue system broke shortly after the launch of Season 1, and due to the game's upcoming shutdown, development had already begun slowing down. As a result, the issue was never resolved, and match tracking became increasingly inconsistent. 

---

### Global Leaderboard

The Global Leaderboard was built to display the top 1,000 players in Spectre Divide, based exclusively on Solo Rank Rating (RR) - team-based ranks were excluded. This feature quickly became one of the most popular aspects of the site, since the game itself lacked a native leaderboard. As a result, Santai.gg became the go-to source for competitive players seeking external validation and friendly competition. Because it was relatively easy to reach the highest in-game rank, players often looked to their placement on the Santai.gg leaderboard as a more meaningful benchmark. Only the top 1,000 players were shown to keep the data... 

#### Design & UX Considerations

The leaderboard was designed with usability and clarity in mind: 
 - Checkered row backgrounds were used to help users visually track player data across wide rows. This reduced eye strain and ensured users accurately select the correct player profile when navigating.
 - A cooler blue background was chosen for this page instead of the standard blue-gray used elsewhere. This contrast helped distinguish the leaderboard table from the rest of the UI, avoiding visual blending between the table and background. 

The leaderboard displayed essential information only:
 - Global Rank
 - Username
 - In-Game Rank (as text)
 - Solo RR

To keep the interface clean and mobile friendly, additional data was moved to each player's individual profile page. Users could access this by clicking a row or searching for a player directly via the home page.

![Santai.gg Global Leaderboard](/projects/santai/globalleaderboard.png)

#### Performance & Pagination 

For performance and user experience reasons, the leaderboard displayed only 50 users per page, even though it covered 1,000 entries. Navigation was handled via:
 - A pagination slider located at the top and of the table to reduce excessive scrolling.
 - A search function at the top of the page, allowing users to filter by username in real-time.

![Santai.gg Global Leaderboard Search Function](/projects/santai/globalleaderboardsearch.png)

One challenge that arose was related to dynamic pagination. When search filters reduced the number of matching entries in the table, the pagination needed to adjust accordingly. For example, if only one result matched the search query, the original 20-page slider would be misleading to the user. I addressed this by building a fully dynamic pagination component that recalculated the number of pages on the fly, as shown in the image above. This experience reinforced the importance of building UI components to be resilient and adaptable, especially when dealing with real-time filtered data.

#### Planned features & Sunset Limitations

The leaderboard was intended to support seasonal filtering, allowing users to view top players by current or past seasons. Unfortunately, the backend service responsible for collecting the Top 1000 players per season was never completed for Season 1, again due to the game's shutdown. As a result, selecting the Season 1 filter returns an empty table. By the time this issue became clear, development on the site had largely halted, so the feature was never finalized.   

---

### Conclusion

Working on Santai.gg was an amazing opportunity for hands-on growth. Despite having no budget and limited time, we built a full funcitonal, community-driven product from the ground up. Contributing to a platform that served real players, and seeing it used actively by the Spectre Divide community, taught me a great deal about shipping polished features under real-world contraints. It was a challenging but rewarding experience that sharpened both my technical and product-thinking skills.