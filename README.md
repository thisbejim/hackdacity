
## How Hackdacity Works

### Voting
Points are determined by retaining and counting the UIDs of voting users rather
than storing the total count of votes a submission has received.

This ensures that a user's vote for a particular submission can only be in
two states (true or null) and that a user can only upvote the submission once.

The relevant security rule:
```
"votes": {
  "$user_id": {
    ".read": "true",
    ".write": "$user_id === auth.uid",
    ".validate": "newData.val() == true || newData.val() == null"
  }
}
```