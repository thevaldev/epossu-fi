# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [1.1.3] - 19.9.2024

### Added

- Added a new setting to save charts state
- Added a width adjust breakpoint for mobile device

### Updated

- Updated settings page
- Updated developer logo
- Updated how fonts are loaded
- Updated breakpoints to help with bigger prices
- Updated vite version

## [1.1.2] - 2.9.2024

### Added

- Added all fonts into the assets folder
- Added the footer & header elements back into `App.tsx` instead of having them in individual files
- Added a form into the notifications page

### Updated

- Updated the website footer
- Updated 404 page texts
- Updated API code example
- Updated some npm dependency
- Updated VAT percentage from `24%` to `25.5%`

### Changed

- Changed the colors explanation title from a `h2` to `h3`
- Changed chart tooltip titles font
- Changed margins on all pages lead text
- Adjusted charts Y-axis for negative prices

### Fixed

- Fixed alerts `border-radius`
- Fixed theme css not using correct background variable

### Removed

- Removed useless development env css

## [1.1.1] - 26.7.2024

### Added

- Added new info about notifications
  > The notifications module is not yet implemented, but will be deployed shortly after this update as it requires some more testing.
- Added settings page.
  - Added a way to check if the devices time is correct
  - Added a way to change between light & dark mode.
    - Theme is pre-selected depending on your browser theme
- Added all fonts into local files instead of importing them

### Updated

- Updated the scss files to use css variables instead of scss variables
- Updated the scss files to use right variables in right places
- Updated the API request logic for fetching new price data
- Updated favicon pack
- Updated README images

### Changed

- Changed the logo into a SVG one and updated the design a bit (Thanks to [@Zardocius](https://github.com/Zardocius))
- Changed the about page line-heights to make the page easier to read.
- Changed header li element font-size on mobile
- Changed chart y-axis values from integers to real price values
- Changed the chart animation
- Changed various texts around the website
- Changed a header breakpoint to make the "API-Rajapinta" not break

### Fixed

- Improved website performance
- Fixed chart x-axis items disappearing when resizing the window
- Fixed chart y-axis large numbers cutting off due to large font-size
- Fixed chart adding padding to y-axis on any minus price
- Fixed front page info not updating when new data is fetched
- Fixed header icons not being centered
- Fixed an API issue where data would not update under certain circumstances

### Removed

- Removed roadmap from README.md
- Removed the "time out of sync" alert
- Removed old Timings functions
- Removed old tests for Timings

## [1.1.0] - 11.4.2024

### Added

- Added ability to change the chart data between yesterday, today and tomorrow
- Added a info page
- Added toggle visiblity buttons to apidocs
- Added JSdocs to the functions that were missing them
- Added parameter info for API docs

### Updated

- Updated main page layout
- Updated website meta details
- Updated CSS for mobile and desktop
  - Adjusted border-radius for all boxes
  - Adjusted most font-sizes
  - Adjusted all breakpoints
  - Moved colors to variables
- Updated API fetch error handling on the main page
- Updated highest & lowest boxes to show the time on the title row insteaad of its own row
- Updated all boxes to use `PriceData` type instead of the old `PriceApiResponse` type

### Changed

- Changed price unit from `snt/kWh` to `c/kWh`
- Changed css file names
- Changed the page footer info

### Fixed

- Fixed chart showing incorrect time under some circumstances.

### Removed

- Removed `next hour` and `next prices` countdown timers
- Removed `PriceApiResponse` type
- Removed unused CSS color vars
- Removed `SceneBuilder` and all its components
