import { CarouselItem } from '../atoms/CarouselItem';
import { Post } from '../atoms/Post';
import mysterious from '../../public/images/mysterious.jpg';
import jakeWebb from '../../public/images/jakeWebb.jpg';
import { CarouselWrapper } from '../molecules/CarouselWrapper';

const Carousel = () => {
  return (
    <CarouselWrapper>
      <CarouselItem>
        <Post
          nickname="CodingMaster09"
          role="Backend dev"
          comment="Coding Blog is a place where you can share your knowledge and experience with other people. It's an amazing feeling when someone
            appreciates your idea!"
        />
      </CarouselItem>
      <CarouselItem>
        <Post
          avatar={mysterious}
          nickname="Mysterious_"
          role="Frontend dev"
          comment="I take a lot of inspiration from the Coding Blog. To my mind every frontend developer should check out this blog. It's a great."
        />
      </CarouselItem>
      <CarouselItem>
        <Post
          avatar={jakeWebb}
          nickname="JakeWebb123"
          role="Devops"
          comment="My name is Jake and I'm a devops engineer. Coding Blog is something between Twitter and Pinterest. It's hard to explain it in few sentences. You must try it on your own!"
        />
      </CarouselItem>
    </CarouselWrapper>
  );
};

export default Carousel;
