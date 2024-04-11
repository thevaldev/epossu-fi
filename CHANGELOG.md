# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

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
