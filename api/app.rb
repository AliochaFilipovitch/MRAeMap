require 'sinatra'
require "sinatra/reloader" if development?
require 'open-uri'
require 'json'
require 'pdf-reader'
require 'nokogiri'

require_relative 'helpers/scraper'

mrae_kk_18 = 'http://www.mrae.developpement-durable.gouv.fr/examen-au-cas-par-cas-et-autres-decisions-r98.html'
mrae_a_18 = 'http://www.mrae.developpement-durable.gouv.fr/avis-rendus-r97.html'


def text_pages(url, nbr)

  resultsdelta = []

  list_links = Scraper.new(url).absolute_urls

  delta = list_links.length - nbr

  if delta >= 0
    0.upto delta do |i|

      resultsdelta << open_link(list_links[i])

    end
  end

  p resultsdelta
  if url == 'http://www.mrae.developpement-durable.gouv.fr/examen-au-cas-par-cas-et-autres-decisions-r98.html'
    data_json_kk(resultsdelta)
  else
    data_json_a(resultsdelta)
  end

end

def open_link(link)
  io = open(link)
  decision_link = link

  reader = PDF::Reader.new(io)
  decision_title = reader.info[:Title]

if decision_title != nil

  if ! decision_title.valid_encoding?
  	decision_title = decision_title.encode("UTF-16be", :invalid=>:replace, :replace=>"?").encode('UTF-8')
  end

  decision_name = decision_title.match(/(?<=PLU ).+(?= [97][1-8])/).to_s

  if decision_name == ""
    decision_name = decision_title.match(/(?<=PLU ).+(?= [97][1-8]_délibéré)/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=PLU ).+(?=_délibéré)/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=d'avis ).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=PLU ).+/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=ZA ).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=ZA_).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=AVAP_).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=._AVAP_).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=MECDU ).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=MECDP ).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=PSMV ).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=SAN ).+/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=cas par cas ).+(?= \(.\))/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=cas par cas urba ).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=cas par cas ).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=cas par cas ).+/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=cas par cas_).+(?= [97][1-8])/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=cas par cas_).+/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=Proposition_).+/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=MRAe_Avis ).+(?= [97][1-8]_)/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=MRAe_).+(?=_d)/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=Decision dispense ).+/).to_s
  end

  if decision_name == ""
    decision_name = decision_title.match(/(?<=Decision ).+/).to_s
  end

else
	decision_title = ""
	decision_name = ""
end

  p [decision_name, decision_title, decision_link]
end

def data_json_kk(data)
	f = File.new("data_kk.json", "w")
	f.puts(data.to_json)
	f.close
end

def data_json_a(data)
  f = File.new("data_a.json", "w")
  f.puts(data.to_json)
  f.close
end

get "/" do
  erb :refresh
end

post '/success_kk' do
	text_pages(mrae_kk_18, 73) #73 (71+1(0)+1(=0))
	"L\'API MRAe est à jour !"
end

post '/success_a' do
  text_pages(mrae_a_18, 27) #27
  "L\'API MRAe est à jour !"
end

get '/data_kk' do
  File.read('data_kk.json')
end

get '/data_a' do
  File.read('data_a.json')
end
