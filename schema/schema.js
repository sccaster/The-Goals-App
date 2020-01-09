const graphql = require('graphql');
const _ = require('lodash');
const { getUser, getGoal, getTask, getNotification, createNotification, editNotification, deleteNotification, createUser, editUser, deleteUser, createTask, editTask, deleteTask, createGoal, editGoal, deleteGoal } = require('./database');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType
} = graphql;

const GoalType = new GraphQLObjectType({
    name: 'Goal',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return getTask({
                    id: parent.id
                });
            }
        }
    })
});

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        // The timestamp is the date that will show when the task must be completed by
        timestamp: { type: GraphQLString },
        // All location info is to remind the user where the task must be completed
        locationlat: { type: GraphQLInt },
        locationlon: { type: GraphQLInt },
        locationrad: { type: GraphQLInt },
        notes: { type: GraphQLString },
        notifications: {
            type: new GraphQLList(NotificationType),
            resolve(parent, args) {
                return getNotification({
                    id: parent.id
                });
            }
        }
    })
});

const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        timestamp: { type: GraphQLString }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        quote: { type: GraphQLString },
        theme: { type: GraphQLString },
        themeDuration: { type: GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        hashed_password: { type: GraphQLString},
        goals: {
            type: new GraphQLList(GoalType),
            resolve(parent, args) {
                return getGoal({
                    id: parent.id
                });
            }
        }
    })
});

// Input Types

const createNotificationInputType = new GraphQLInputObjectType({
    name: 'CreateNotificationInput',
    fields: () => ({
        text: { type: GraphQLString },
        timestamp: { type: GraphQLString },
        task_id: { type: GraphQLID }
    })
});

const editNotificationInputType = new GraphQLInputObjectType({
    name: 'EditNotificationInput',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        timestamp: { type: GraphQLString }
    })
});

const deleteNotificationInputType = new GraphQLInputObjectType({
    name: 'DeleteNotificationInputType',
    fields: () => ({
        id: { type: GraphQLID }
    })
});

const createUserInputType = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: () => ({
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString},
        email: { type: GraphQLString },
        hashed_password: { type: GraphQLString }
    })
});

const editUserInputType = new GraphQLInputObjectType({
    name: 'EditUserInput',
    fields: () => ({
        id: { type: GraphQLID},
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        hashed_password: { type: GraphQLString }
    })
});

const deleteUserInputType = new GraphQLInputObjectType({
    name: 'DeleteUserInput',
    fields: () => ({
        id: { type: GraphQLID }
    })
});

const createTaskInputType = new GraphQLInputObjectType({
    name: 'CreateTaskInput',
    fields: () => ({
        title: { type: GraphQLString },
        timestamp: { type: GraphQLString },
        locationlat: { type: GraphQLInt },
        locationlon: { type: GraphQLInt },
        locationrad: { type: GraphQLInt },
        notes: { type: GraphQLString },
        goal_id: { type: GraphQLID }
    })
});

const editTaskInputType = new GraphQLInputObjectType({
    name: 'EditTaskInput',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        timestamp: { type: GraphQLString },
        locationlat: { type: GraphQLInt },
        locationlon: { type: GraphQLInt },
        locationrad: { type: GraphQLInt },
        notes: { type: GraphQLString }
    })
});

const deleteTaskInputType = new GraphQLInputObjectType({
    name: 'DeleteTaskInput',
    fields: () => ({
        id: { type: GraphQLID }
    })
});

const createGoalInputType = new GraphQLInputObjectType({
    name: 'CreateGoalInput',
    fields: () => ({
        text: { type: GraphQLString }
    })
});

const editGoalInputType = new GraphQLInputObjectType({
    name: 'EditGoalInput',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString }
    })
});

const deleteGoalInputType = new GraphQLInputObjectType({
    name: 'DeleteGoalInput',
    fields: () => ({
        id: { type: GraphQLID }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        goal: {
            type: new GraphQLList(GoalType),
            args: { id: { type: GraphQLID },
                    title: { type: GraphQLString } 
            },
            resolve(parent, args) {
                return getGoal({
                    id: args.id
                });
            }
        },
        task: {
            type: new GraphQLList(TaskType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return getTask({
                    id: args.id
                });
            }
        },
        user: {
            type: new GraphQLList(UserType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return getUser({
                    id: args.id
                });
            }
        },
        notification: {
            type: new GraphQLList(NotificationType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return getNotification({
                    id: args.id
                });
            }
        }
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        createNotification: {
            type: NotificationType,
            args: {
                input: { type: createNotificationInputType }
            },
            resolve(parent, args) {
                return createNotification({
                    input: args.input
                });
            }
        },
        editNotification: {
            type: NotificationType,
            args: {
                input: { type: editNotificationInputType }
            },
            resolve(parent, args) {
                return editNotification({
                    input: args.input
                });
            }
        },
        deleteNotification: {
            type: NotificationType,
            args: {
                input: { type: deleteNotificationInputType }
            },
            resolve(parent, args) {
                return deleteNotification({
                    input: args.input
                });
            }
        },
        createUser: {
            type: UserType,
            args: {
                input: { type: createUserInputType }
            },
            resolve(parent, args) {
                return createUser({
                    input: args.input
                });
            }
        },
        editUser: {
            type: UserType,
            args: {
                input: { type: editUserInputType }
            },
            resolve(parent, args) {
                return editUser({
                    input: args.input
                });
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                input: { type: deleteUserInputType }
            },
            resolve(parent, args) {
                return deleteUser({
                    input: args.input
                });
            }
        },
        createTask: {
            type: TaskType,
            args: {
                input: { type: createTaskInputType }
            },
            resolve(parent, args) {
                return createTask({
                    input: args.input
                });
            }
        },
        editTask: {
            type: TaskType,
            args: {
                input: { type: editTaskInputType }
            },
            resolve(parent, args) {
                return editTask({
                    input: args.input
                });
            }
        },
        deleteTask: {
            type: TaskType,
            args: {
                input: { type: deleteTaskInputType }
            },
            resolve(parent, args) {
                return deleteTask({
                    input: args.input
                });
            }
        },
        createGoal: {
            type: GoalType,
            args: {
                input: { type: createGoalInputType }
            },
            resolve(parent, args) {
                return createGoal({
                    input: args.input
                });
            }
        },
        editGoal: {
            type: GoalType,
            args: {
                input: { type: editGoalInputType }
            },
            resolve(parent, args) {
                return editGoal({
                    input: args.input
                });
            }
        },
        deleteGoal: {
            type: GoalType,
            args: {
                input: { type: deleteGoalInputType }
            },
            resolve(parent, args) {
                return deleteGoal({
                    input: args.input
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});