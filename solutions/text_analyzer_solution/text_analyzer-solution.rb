

=begin 
 try using Ruby methods
 it's similar to using a function in js
 look up function/method `read_text_from_file` as an example
 structure: 
 def method_name
    logic of method goes in here
 end

=end

# logic for text_analyzer requirments go here:

#Method to count words
def count_words(text)
    words = text.scan(/\b\w+\b/)
    words.length
end

def word_fequency_stats(text)
    words = text.scan(/\b\w+\b/)
    word_frequency = Hash.new(0)

    words.each do |each|
        word_frequency[word.downcase += 1]
end

    sorted_words
def count_characters(text)
    text.length
end
# Anayze text
def analyze_text(filename)
    text = read_text_from_file(filename)

    word_count = count_wors(text)
    character_count = count_characters(text)
    paragraph_count = count_paragraphs(text)
    most_common, most_common_frequency = most_common_word(text)
    top_words = word_frequency_stats(text)


    puts "Word Count: #{word_count} "
    puts "Character Count: #{character_count}"
    puts "Paragraphs Count: #{paragraph_count}"
    puts "Most Common Word:  #{most_common} Apppears #{most_common_frequency} times"
    puts "Top 10 Most Common Words:"
    top_words.each do |word, frequency|
        puts "'#{word}' - #{frequency} times"
end



#Method to count paragraphs
def count_paragraphs(text)
    paragraphs =  text.split("\n\n")
    paragraphs.size
end


#Most common word
def most_common_word(text)
    words = text.split("\n\n")
    word_frequency = Hash.new(0)

    words.each do |word|
       words_frequency[word.downcase] += 1 
    end

    most_common = words_frequuency.max_by{ |word, frequency| frequency}
    most_common
end

if ARGV.length == 1
    filename = ARGV[0]
    analyze_text(filename)
else   
    puts "Usage: ruby script_name.rb <filename>"
end

# Read text from a file
def read_text_from_file(filename)
    File.read(filename)
end

# Analyze the sample text
filename = 'sample.txt' # Replace with your text file
text = read_text_from_file(filename)

# use `text` ^ to pass as a parameters to your methods

# puts statements to console go here:

puts 'this is a test'