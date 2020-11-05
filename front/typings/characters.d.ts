interface Characters {
  error: string;
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  version: string;
  results: Character[];
}

interface Character {
  aliases: string | null;
  api_detail_url: string;
  birth: string | null;
  count_of_issue_appearances: number;
  date_added: string;
  date_last_updated: string;
  deck: string | null;
  description: string | null;
  first_appeared_in_issue: FirstAppearedInIssue;
  gender: number;
  id: number;
  image: Image;
  name: string;
  origin: Origin | null;
  publisher: Origin;
  real_name: string | null;
  site_detail_url: string;
  favorite?: boolean;
}

interface Origin {
  api_detail_url: string;
  id: number;
  name: string;
}

interface Image {
  icon_url: string;
  medium_url: string;
  screen_url: string;
  screen_large_url: string;
  small_url: string;
  super_url: string;
  thumb_url: string;
  tiny_url: string;
  original_url: string;
  image_tags: string;
}

interface FirstAppearedInIssue {
  api_detail_url: string;
  id: number;
  name: string | null;
  issue_number: string;
}