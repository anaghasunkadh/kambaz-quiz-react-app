export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
Text documents are often broken up into several sections and subsections. Each section is usually prefaced with a short title or heading that attempts to summarize the topic of the section it precedes. For instance this paragraph is preceded by the heading Heading Tags. The font of the section headings are usually larger and bolder than their subsection headings. This document uses headings to introduce topics such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags can be used to format plain text so that it renders in a browser as large headings. There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest heading.
      </div>
            <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1"> ... </p>
        <p id="wd-p-2">
This is the first paragraph. The paragraph tag is used to format
vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-3">
This is the second paragraph. Even though there is a deliberate white
gap between the paragraph above and this paragraph, by default
browsers render them as one contiguous piece of text as shown here on
the right.
        </p>
        <p id="wd-p-4">
This is the third paragraph. Wrap each paragraph with the paragraph
tag to tell browsers to render the gaps.
        </p>
      </div>
<div id="wd-lists">
  <h4>List Tags</h4>
  <h5>Ordered List Tag</h5>
  How to make pancakes:
  <ol id="wd-pancakes">
    <li>Mix dry ingredients.</li>
    <li>Add wet ingredients.</li>
    <li>Stir to combine.</li>
    <li>Heat a skillet or griddle.</li>
    <li>Pour batter onto the skillet.</li>
    <li>Cook until bubbly on top.</li>
    <li>Flip and cook the other side.</li>
    <li>Serve and enjoy!</li>
  </ol>
</div>
<h5>Unordered List Tag</h5>
My favorite books (in no particular order)
<ul id="wd-your-books">
  <li>Dune</li>
  <li>Lord of the Rings</li>
  <li>Ender's Game</li>
  <li>Red Mars</li>
  <li>The Forever War</li>
</ul>
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr> ... </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>90</td>
            </tr>
          </tfoot>
        </table>
      </div>
<div id="wd-images">
  <h4>Image tag</h4>
  Loading an image from the internet: <br />
  <img id="wd-starship" width="400px"   src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg" />
  <br />
  Loading a local image:
  <br />
  <img id="wd-teslabot" src="/src/images/teslabot.jpg" height="200px" /></div>

  <form id="wd-text-fields">
    <h5>Text Fields</h5>
    <label htmlFor="wd-text-fields-username">Username:</label>
    <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
    <label htmlFor="wd-text-fields-password">Password:</label>
    <input type="password" value="123@#$asd" id="wd-text-fields-password" />
    <br />
    <label htmlFor="wd-text-fields-first-name">First name:</label>
    <input type="text" title="John" id="wd-text-fields-first-name" /> <br />
    <label htmlFor="wd-text-fields-last-name">Last name:</label>
    <input type="text" placeholder="Doe"
           value="Wonderland"
           title="The last name"
           id="wd-text-fields-last-name" />
    <h5>Text boxes</h5>
<label>Biography:</label><br/>
<textarea id="wd-textarea" cols={30} rows={10}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>


  </form>

<h5 id="wd-buttons">Buttons</h5>

<button
  type="button"
  onClick={() => alert("Life is Good!")}
  id="wd-all-good"
>
  Life is Good!
</button>
<h5>File upload</h5>
<input type="file" id="wd-file-upload" />
<h5>Radio buttons</h5>
<p>Favorite movie genre:</p>

<input type="radio" id="comedy" name="genre" value="Comedy" />
<label htmlFor="comedy"> Comedy</label><br />

<input type="radio" id="drama" name="genre" value="Drama" />
<label htmlFor="drama"> Drama</label><br />

<input type="radio" id="scifi" name="genre" value="Science Fiction" />
<label htmlFor="scifi"> Science Fiction</label><br />

<input type="radio" id="fantasy" name="genre" value="Fantasy" />
<label htmlFor="fantasy"> Fantasy</label><br />
<h5>Checkboxes</h5>
<p>Favorite movie genre:</p>

<input type="checkbox" id="checkbox-comedy" name="genre" value="Comedy" />
<label htmlFor="checkbox-comedy"> Comedy</label><br />

<input type="checkbox" id="checkbox-drama" name="genre" value="Drama" />
<label htmlFor="checkbox-drama"> Drama</label><br />

<input type="checkbox" id="checkbox-scifi" name="genre" value="Science Fiction" />
<label htmlFor="checkbox-scifi"> Science Fiction</label><br />

<input type="checkbox" id="checkbox-fantasy" name="genre" value="Fantasy" />
<label htmlFor="checkbox-fantasy"> Fantasy</label><br />
<h5>Dropdowns</h5>
<p>Select one</p>
<label htmlFor="dropdown-single">Favorite movie genre:</label><br />
<select id="dropdown-single" name="genre">
  <option value="">-- Select a genre --</option>
  <option value="Comedy">Comedy</option>
  <option value="Drama">Drama</option>
  <option value="Science Fiction">Science Fiction</option>
  <option value="Fantasy">Fantasy</option>
</select>
<p>Select many</p>
<label htmlFor="dropdown-multi">Favorite movie genres:</label><br />
<select id="dropdown-multi" name="genres" multiple size={4}>
  <option value="Comedy">Comedy</option>
  <option value="Drama">Drama</option>
  <option value="Science Fiction">Science Fiction</option>
  <option value="Fantasy">Fantasy</option>
</select>
  <h5>Other HTML field types</h5>

<form>
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
    <label htmlFor="email" style={{ width: 140, marginRight: 10 }}>
      Email:
    </label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="jdoe@somewhere.com"
      defaultValue="jdoe@somewhere.com"
    />
  </div>

  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
    <label htmlFor="salary" style={{ width: 140, marginRight: 10 }}>
      Starting salary:
    </label>
    <input
      type="number"
      id="salary"
      name="salary"
      defaultValue={100000}
      min={0}
      step={1000}
    />
  </div>

  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
    <label htmlFor="rating" style={{ width: 140, marginRight: 10 }}>
      Rating:
    </label>
    <input
      type="range"
      id="rating"
      name="rating"
      min={0}
      max={10}
      defaultValue={5}
    />
  </div>

  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
    <label htmlFor="dob" style={{ width: 140, marginRight: 10 }}>
      Date of birth:
    </label>
    <input
      type="date"
      id="dob"
      name="dob"
      defaultValue="2000-01-21"
    />
  </div>
</form>
<h5>Anchor tag</h5>
<p>
  Please{' '}
  <a href="https://www.lipsum.com/" target="_blank" rel="noopener noreferrer">
    click here
  </a>{' '}
  to get dummy text.
</p>


    </div>
);}

