"use client";

import { BookPage } from "./Components/Books";
import { Post, PostQuote, PostSection, PostThumbnail } from "./Components/Post";
import SignInEmailPassword from "./Components/SignIn";




export default function Home() {

  const onClick = () => {
    getBookInfo("0930289234")
    .then(bookInfo => {
        console.log("Book Title:", bookInfo.title);
        console.log("Author(s):", bookInfo.authors ? bookInfo.authors.join(", ") : "Unknown");
        console.log("Publish Date:", bookInfo.publish_date);
        console.log("Number of Pages:", bookInfo.number_of_pages);
        console.log("Subjects:", bookInfo.subjects ? bookInfo.subjects.join(", ") : "Unknown");
        
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <main className="p-7">
        <Post 
          title="Writing a basic blog page component" 
          topic="Blog" publishDate="March 7, 2024"
          author="Henry Gronow"
          readTime="10 mins"
        >
          <PostSection header="Main">
            <PostQuote speaker="Alex Woodroof">Hello, Where Am I?</PostQuote>
            <PostThumbnail 
              onClick={onClick }
              title="Very long page blog title to test the limits of the box" 
              topic="blog" 
              date="March 7, 2024" 
              author="Henry Gronow"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat velit sit amet diam dictum pulvinar. Fusce sed accumsan augue. Quisque nisi libero, venenatis in cursus sit amet, malesuada eu tellus. Vestibulum sit amet augue nisl. Sed in luctus justo. Nam sit amet sodales elit. Phasellus et laoreet eros. Duis accumsan condimentum sapien, eget commodo eros. Vivamus pulvinar bibendum nibh, ac ullamcorper justo hendrerit eu. Donec et ex tortor. Fusce laoreet vehicula quam, ornare maximus ex commodo in. Maecenas egestas, enim in iaculis pellentesque, ex metus malesuada sem, ut dapibus ipsum magna id quam. Duis vel est nec tellus suscipit posuere. Phasellus scelerisque dictum purus, vel placerat neque pulvinar ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin maximus blandit diam, eget ultricies tortor cursus non. 
            </p>
            <p>
              Nullam et lorem quis massa sollicitudin venenatis eget sed urna. Donec hendrerit, enim quis efficitur cursus, libero lacus euismod eros, id viverra tortor odio sit amet magna. Nunc bibendum posuere ipsum non aliquam. Nulla aliquet dictum est, eu consequat ante gravida sit amet. Integer pharetra efficitur lobortis. Suspendisse luctus libero vel est congue, quis aliquam tortor cursus. Praesent mattis molestie commodo. Nunc magna arcu, euismod eu lobortis in, egestas ut massa. Sed hendrerit bibendum neque ut mollis. Donec quis orci tristique, fringilla orci id, auctor nulla. Sed aliquet tincidunt nisl, ac blandit purus hendrerit at. Fusce at nibh urna. 
            </p>
            <p>
              Sed in lacinia nisl, ac bibendum massa. Morbi pretium odio luctus vehicula ultrices. Morbi dignissim massa ut dignissim rhoncus. Morbi nec luctus orci. Nullam ac vulputate libero. Aenean enim enim, ultricies nec congue non, condimentum at mi. Maecenas libero tortor, tristique sit amet aliquet vel, maximus et ligula. Praesent malesuada ut purus eget vehicula. 
            </p>
            <p>
              In et risus porttitor, viverra ligula id, malesuada metus. Sed dolor ipsum, elementum in porttitor quis, bibendum nec arcu. Sed elementum blandit massa nec iaculis. Vivamus rhoncus sodales nulla quis egestas. Ut aliquet venenatis mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vulputate viverra tempor. 
            </p>
            <PostQuote speaker="Alex Woodroof">Drop a "💯" if thats awesome</PostQuote>
            <p>
              Vivamus euismod nibh id lorem posuere posuere. Nulla imperdiet pellentesque mauris ac posuere. Aliquam gravida magna vel tortor efficitur imperdiet. Mauris iaculis aliquet est, in venenatis nulla vehicula quis. Nunc in magna varius, aliquam magna nec, eleifend ex. Maecenas turpis nulla, consectetur sed nisl laoreet, bibendum faucibus libero. Aliquam quis odio ut lorem tincidunt suscipit eget vel ante. Fusce ac fermentum nibh. Duis ut volutpat metus. Donec facilisis gravida ipsum, eu congue magna suscipit at. Nam vitae est tincidunt, pretium eros quis, aliquet felis. 
            </p>
          </PostSection>
          <PostSection header="Hello">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat velit sit amet diam dictum pulvinar. Fusce sed accumsan augue. Quisque nisi libero, venenatis in cursus sit amet, malesuada eu tellus. Vestibulum sit amet augue nisl. Sed in luctus justo. Nam sit amet sodales elit. Phasellus et laoreet eros. Duis accumsan condimentum sapien, eget commodo eros. Vivamus pulvinar bibendum nibh, ac ullamcorper justo hendrerit eu. Donec et ex tortor. Fusce laoreet vehicula quam, ornare maximus ex commodo in. Maecenas egestas, enim in iaculis pellentesque, ex metus malesuada sem, ut dapibus ipsum magna id quam. Duis vel est nec tellus suscipit posuere. Phasellus scelerisque dictum purus, vel placerat neque pulvinar ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin maximus blandit diam, eget ultricies tortor cursus non. 
            </p>
            <p>
              Nullam et lorem quis massa sollicitudin venenatis eget sed urna. Donec hendrerit, enim quis efficitur cursus, libero lacus euismod eros, id viverra tortor odio sit amet magna. Nunc bibendum posuere ipsum non aliquam. Nulla aliquet dictum est, eu consequat ante gravida sit amet. Integer pharetra efficitur lobortis. Suspendisse luctus libero vel est congue, quis aliquam tortor cursus. Praesent mattis molestie commodo. Nunc magna arcu, euismod eu lobortis in, egestas ut massa. Sed hendrerit bibendum neque ut mollis. Donec quis orci tristique, fringilla orci id, auctor nulla. Sed aliquet tincidunt nisl, ac blandit purus hendrerit at. Fusce at nibh urna. 
            </p>
            <p>
              Sed in lacinia nisl, ac bibendum massa. Morbi pretium odio luctus vehicula ultrices. Morbi dignissim massa ut dignissim rhoncus. Morbi nec luctus orci. Nullam ac vulputate libero. Aenean enim enim, ultricies nec congue non, condimentum at mi. Maecenas libero tortor, tristique sit amet aliquet vel, maximus et ligula. Praesent malesuada ut purus eget vehicula. 
            </p>
            <p>
              In et risus porttitor, viverra ligula id, malesuada metus. Sed dolor ipsum, elementum in porttitor quis, bibendum nec arcu. Sed elementum blandit massa nec iaculis. Vivamus rhoncus sodales nulla quis egestas. Ut aliquet venenatis mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vulputate viverra tempor. 
            </p>
            <p>
              Vivamus euismod nibh id lorem posuere posuere. Nulla imperdiet pellentesque mauris ac posuere. Aliquam gravida magna vel tortor efficitur imperdiet. Mauris iaculis aliquet est, in venenatis nulla vehicula quis. Nunc in magna varius, aliquam magna nec, eleifend ex. Maecenas turpis nulla, consectetur sed nisl laoreet, bibendum faucibus libero. Aliquam quis odio ut lorem tincidunt suscipit eget vel ante. Fusce ac fermentum nibh. Duis ut volutpat metus. Donec facilisis gravida ipsum, eu congue magna suscipit at. Nam vitae est tincidunt, pretium eros quis, aliquet felis. 
            </p>
          </PostSection>
          <PostSection header="Rahh">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat velit sit amet diam dictum pulvinar. Fusce sed accumsan augue. Quisque nisi libero, venenatis in cursus sit amet, malesuada eu tellus. Vestibulum sit amet augue nisl. Sed in luctus justo. Nam sit amet sodales elit. Phasellus et laoreet eros. Duis accumsan condimentum sapien, eget commodo eros. Vivamus pulvinar bibendum nibh, ac ullamcorper justo hendrerit eu. Donec et ex tortor. Fusce laoreet vehicula quam, ornare maximus ex commodo in. Maecenas egestas, enim in iaculis pellentesque, ex metus malesuada sem, ut dapibus ipsum magna id quam. Duis vel est nec tellus suscipit posuere. Phasellus scelerisque dictum purus, vel placerat neque pulvinar ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin maximus blandit diam, eget ultricies tortor cursus non. 
            </p>
            <p>
              Nullam et lorem quis massa sollicitudin venenatis eget sed urna. Donec hendrerit, enim quis efficitur cursus, libero lacus euismod eros, id viverra tortor odio sit amet magna. Nunc bibendum posuere ipsum non aliquam. Nulla aliquet dictum est, eu consequat ante gravida sit amet. Integer pharetra efficitur lobortis. Suspendisse luctus libero vel est congue, quis aliquam tortor cursus. Praesent mattis molestie commodo. Nunc magna arcu, euismod eu lobortis in, egestas ut massa. Sed hendrerit bibendum neque ut mollis. Donec quis orci tristique, fringilla orci id, auctor nulla. Sed aliquet tincidunt nisl, ac blandit purus hendrerit at. Fusce at nibh urna. 
            </p>
            <p>
              Sed in lacinia nisl, ac bibendum massa. Morbi pretium odio luctus vehicula ultrices. Morbi dignissim massa ut dignissim rhoncus. Morbi nec luctus orci. Nullam ac vulputate libero. Aenean enim enim, ultricies nec congue non, condimentum at mi. Maecenas libero tortor, tristique sit amet aliquet vel, maximus et ligula. Praesent malesuada ut purus eget vehicula. 
            </p>
            <p>
              In et risus porttitor, viverra ligula id, malesuada metus. Sed dolor ipsum, elementum in porttitor quis, bibendum nec arcu. Sed elementum blandit massa nec iaculis. Vivamus rhoncus sodales nulla quis egestas. Ut aliquet venenatis mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec vulputate viverra tempor. 
            </p>
            <p>
              Vivamus euismod nibh id lorem posuere posuere. Nulla imperdiet pellentesque mauris ac posuere. Aliquam gravida magna vel tortor efficitur imperdiet. Mauris iaculis aliquet est, in venenatis nulla vehicula quis. Nunc in magna varius, aliquam magna nec, eleifend ex. Maecenas turpis nulla, consectetur sed nisl laoreet, bibendum faucibus libero. Aliquam quis odio ut lorem tincidunt suscipit eget vel ante. Fusce ac fermentum nibh. Duis ut volutpat metus. Donec facilisis gravida ipsum, eu congue magna suscipit at. Nam vitae est tincidunt, pretium eros quis, aliquet felis. 
            </p>
          </PostSection>
        </Post>
    </main>
  );
}
