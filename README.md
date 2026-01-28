# The K4GGWA knowledge platform.

This repository contains the code for the K4GGWA knowledge platform, built with Quarto. The K4GGWA dashboard is developed separately using Julia Genie and deployed on a separate repository.

Structure:

- `index.qmd`: the main page of the website
- `about.qmd`: information about the project
- `land_health.qmd`: information about the land health dashboard
- `data.qmd`: information about the data
- `visualizations.qmd`: information about the visualizations
- `methodology.qmd`: information about the methodology
- `team.qmd`: information about the team

For posts and stories:

- `content/case-studies`: directory for posts with case studies
- `content/restoration-stories`: directory for stories about restoration projects
- `content/events-workshops`: directory for news articles about events and workshops

Each post or story is a markdown file in the respective directory. To create a new add folders to the respective directory and add the files. The naming of folders should follow the format `YYYY-MM-DD`. For example, `2024-02-20` for a post created on February 20, 2024. Inside the folder, add the markdown file and any other assets you want to include, including an "images" subfolder, for example.

### Note:
This repo is supported by SPACIAL CICD infrastructure, thus, any change to it will be deployed automatically. Please contact admin if you do not see changes. 
