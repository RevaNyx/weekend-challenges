# Logic for text analyzer requirements:

# 1. Read a text document provided as input (user can provide filename).

def read_text(filepath)
    if File.exist?(filepath)
      File.read(filepath)
    else
      puts "File not found: #{filepath}"
      exit(1) # Exit the program if file not found.
    end
end

  # Main function to control the program flow. The starting point of the program.
def main
    
    # Asking for user input. The user inputs a path to a .txt document.
    # Check if an argument (filename) is provided using ARGV
    if ARGV.empty?
        puts "Please provide a filename as an argument."
        exit(1)
      end
    
      # Get the filename from the first argument
      filepath = ARGV[0]
      
      # Read the text content using the provided filename
      text = read_text(filepath)    
      # The read_text function(content of the file) is stored in the variable 'text'.

=begin
    Defined the function read_text taking the argument filepath, which represents
    the path to the text file I want to read.

    ARGV checks to see if any command-line arguments have been passed. If arguments are provided, 
    it accesses the first arguments using ARGV[0] and stores it in the filename variable.
    If the file doesnt exist then a message displays to the console stating that
    the file was not found, and the program exits.  
=end

# 2. Implement a function that counts the number of words in the document.
  def word_counter(text)
    text.split.size 
  end
=begin
    The text is being split into an array of words. By default it's splitting
    based on whitespace characters(spaces, tabs, new lines). .size counts the number of
    elements(words) in the array.
=end
# 3. Implement a function that counts the number of characters in the document.
  def count_characters(text)
    text.length
  end

# The total number of characters in a given string is beign calculated.

  
# 4. Implement a function that counts the number of paragraphs in the document.
  def para_count(text)
    text.split("\n\n").size
  end
=begin
  Splitting the text into an array of substrings, using double newline characters
  (\n\n) as the delimiter. Each subtsring represents a paragraph. '.size' is called,
  which is the number of paragraphs.
=end
  
# 5. Identify the most common word in the document and display it along with its frequency.
  def most_common_word(text)
    words = text.downcase.scan(/\b[\w']+\b/)  # Normalize and split words.
    frequency = Hash.new(0)
    words.each { |word| frequency[word] += 1 }
    frequency.max_by { |_, count| count} # Returns the word and its frequency.
  end

    most_common = most_common_word(text) #Shorter name.
=begin
  1. words = text.downcase.scan(/\b[\w']+\b/)
    - Lowercases the entire text so that all words are treated the same.
    - .scan(/\b[w']+\b/) - Identifies and captures words within a text
      \b matches a word boundary(beginning or end of a word)
      [\w']+ Matches one or more word characters (\w) or apostrophes (').
      This allows for words with apostrophes like "don't" to be captured.

  2. Each word is iterated through, and the frequency of repetitive words
    is stored in the hash 'frequency'. Hash.new(0) - This special syntax 
    creates a hash where missing keys will be automatically assigned a 
    default value of 0. 0 is count in the max_by method used on the 
    frequency hash to find the word with the highest frequency. The 
    underscore in the key-value pair indicates that the key(the word) 
    isn't being used.
=end
# 6. Provide word frequency statistics, listing the top 10 most common words and their frequencies.
  def top_10_words(text)
    words = text.downcase.scan(/\b[\w']+\b/)
    frequency = Hash.new(0)
    words.each { |word| frequency[word] += 1 }
    frequency.sort_by { |_, count| -count }.first(10)
  end

=begin
  Same condtions as most_common_word function, except this one is looking for
  the top 10 most common words. .first(10) method takes the first 10 elements
  from the sorted hash which represents the top 10 most common words. This way
  we can find the most frequently used words withouyt explicitly finding the
  single most frequent word.
=end
  
    # Print the file contents directly (empty puts to see everything better).
    puts "FILE CONTENTS: #{text}"
    puts
    puts "NUMBER OF WORDS: #{word_counter(text)}   NUMBER OF CHARACTERS: #{count_characters(text)}"
    puts
    puts "NUMBER OF PARAGRAPHS: #{para_count(text)}   MOST COMMON WORD: #{most_common[0]} (#{most_common[1]} times)"
    puts
    puts "TOP 10 MOST COMMON WORDS: "
    top_10_words(text).each { |word, count| puts "#{word}: #{count}" }

=begin
  top_10_words function is called. Each element is iterated over (word, count(frequency)) 
in the returned array, and printed to the console.
=end
end
  
  # Call the main function to start the program
  main
  puts

  # Acces the text files
=begin
  ruby text_analyzer.rb test.txt
  ruby text_analyzer.rb sample.txt
  ruby text_analyzer.rb roots-rock-reggae.txt
=end