class Scraper
  BASE_URL = "http://www.mrae.developpement-durable.gouv.fr/"

  def initialize(url)
    @url = url
  end

  def absolute_urls
    relative_links.map{ |link| BASE_URL + link["href"] }
  end

  private

  attr_reader :url

  def relative_links
    page = Nokogiri::HTML(open(url))
    page.css('a.LienTelecharg')
  end
end
