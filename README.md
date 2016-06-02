# SCORM-to-TLA-Roadmap
Guidance on transitioning from a SCORM environment to a TLA environment.

See more information about [the roadmap](http://adlnet.github.io/SCORM-to-TLA-Roadmap/).

#SCORM - Phase 0

Typical SCORM learning environment. An LMS is the central hub of the learning environment, delivering content and recording learner progress.

This phase represents the starting point for the roadmap. In this phase SCORM tools, products and training material is used to create an interoperable learning environment. The Learning Management System (LMS) stands in the center of this environment, potentially managing learners, the training material and the learner records.

#LMS Centric - Phase 1

The LMS continues to be the central hub, but learner progress is also sent to a LRS via xAPI. The dual tracking of learner experiences provides a consistent means to access that data for uses such as reports and analytics.

The phase still leverages SCORM to manage all aspects of a course from launching to learner progress. This phase adds reporting learning experiences via the xAPI, as well as traditional SCORM tracking. This results in records of learning experiences existing in both the LMS and the LRS. However, supplemental learning experience data can be stored in the LRS that may not be able to be tracked through the SCORM API and data model.

#LRS Centric - Phase 2

The reliance on the LMS has diminished. The LRS stores learner experiences and content no longer needs to be managed by the LMS. At this point, the LMS, if used, is just a consumer of the xAPI service.

This phase begins to reduce an organization's reliance on an LMS, but still contains an LMS due to existing investments and interfaces with other systems. The xAPI SCORM-profile and any additional xAPI data is tracked by native xAPI content. Launch of this content is managed by a system other than the LMS. xAPI data which relates directly to LMS data may be synced between the LRS and LMS so existing system interfaces or reports continue to work.

#TLA - Phase 3

A services based approach to training and learning environments. APIs for learning services are defined and used to create a a completely customizable training and learning environment.

This phase is currently a catch-all for any future compontents of the Training and Learning Architecture. As the learning environment becomes more services focused, other aspects traditionally provided by an LMS will be defined as stand-alone components with standard interfaces. This approach will allow organizations to choose which components are right for them without the concerns of compatibility with existing services.
