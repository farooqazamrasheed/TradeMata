import React from 'react';
import { BsEyeFill } from "react-icons/bs";


const BlogSection = ({ posts }) => {
  const [firstPost] = posts;
  const smallPosts = posts.slice(1,3);
  return (
    <section className="relative overflow-hidden py-20">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="my-18 -mx-4 flex flex-wrap px-4">
            {/* Large Image and Blog Details for the first post */}
            <div className="mb-12 w-full p-1 lg:mb-0 lg:w-2/3">
              <div className="group block w-full" href="#">
                <div className="relative">
                  <img
                    className="w-full h-auto"
                    src={firstPost.poster}
                    alt=""
                  />
                  <div className="absolute bottom-0 left-0 mb-5 w-full ml-5 text-white">
                    <div className="flex w-full">
                      <div className="text-white text-center py-1 text-xs">
                        <div className="text-white px-2 flex">
                          {' '}
                          <div className="text-lg mr-1">
                            <BsEyeFill />
                          </div>{' '}
                          <span style={{ marginTop: '1px' }}>
                            {firstPost.views} Views
                          </span>
                        </div>
                      </div>
                      <div className="bg-black bg-opacity-50 mr-2 flex text-center content-center text-white px-1">
                        <p className="mt-1 w-full text-xs font-semibold leading-tight">
                          #{firstPost.category}
                        </p>
                      </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                      {firstPost.title}
                    </h1>
                  </div>
                  <div className="absolute bg-green-600 top-0 -mt-4 left-0 w-full md:w-auto md:ml-5 md:block text-white">
                    <h1 className="text-2xl font-semibold p-2 md:p-4">
                      LATEST STORIES
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Cards for the remaining posts */}
            <div  className="w-full lg:w-1/3">
            {smallPosts.map((post, index) => (
              
                <div key={post.title} className="relative md:flex p-1" href="#">
                  <img
                    className="h-auto w-full"
                    src={post.poster}
                    alt=""
                  />
                  <div className="absolute bottom-0 left-0 mb-5 w-full ml-1 text-white">
                    <div className="flex w-full">
                      <div className="text-white text-center py-1 text-xs">
                        <div className="text-white px-2 flex">
                          {' '}
                          <div className="text-lg mr-1">
                            <BsEyeFill />
                          </div>{' '}
                          <span style={{ marginTop: '1px' }}>
                            {post.views} Views
                          </span>
                        </div>
                      </div>
                      <div className="bg-black bg-opacity-50 mr-2 flex text-center content-center text-white px-1">
                        <p className="mt-1 w-full text-xs font-semibold leading-tight">
                          #{post.category}
                        </p>
                      </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                      {post.title}
                    </h1>
                  </div>
                </div>
            
            ))}  </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
